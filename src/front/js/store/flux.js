const getState = ({ getStore, getActions, setStore }) => {
  return {
    store: {
      token: null,
      urlBase: "http://localhost:3001/api",
      message: { text: "", type: false },
      postperfumes: [],
      postshirts: [],
      postaccesorios: [],
      user_id: localStorage.getItem("user_id") || "",
      gettingcartbyid: [],
      userData: [],
      carts: [],
    },
    actions: {
      modifymessage: (text, type) => {
        setStore({ message: { text: text, type: type } });
      },
      getPerfumes: async () => {
        try {
          let response = await fetch(`${getStore().urlBase}/perfumes`);

          let data = await response.json();

          setStore({
            postperfumes: data,
          });
        } catch (error) {
          console.log(`${error}error`);
        }
      },
      getTshirts: async () => {
        try {
          let resp = await fetch(`${getStore().urlBase}/tshirts`);
          let data = await resp.json();

          setStore({
            postshirts: data,
          });
        } catch (error) {
          console.log(`${error}error`);
        }
      },
      getAccesorios: async () => {
        try {
          let resp = await fetch(`${getStore().urlBase}/accesorios`);
          let data = await resp.json();

          setStore({ postaccesorios: data });
        } catch (error) {
          console.log(`${error}error`);
        }
      },
      getCart: (user_id) => {
        fetch(`${getStore().urlBase}/carts/${user_id}`, {
          method: "GET",
          headers: {
            "Content-type": "application/json",
          },
        })
          .then((response) => response.json())
          .then((result) => {
            setStore({ gettingcartbyid: result });
          })
          .catch((error) => {
            console.error("Error:", error);
          });
      },
      addCart: (carts) => {
        let cart = getStore().carts.some((item) => item.id == carts.id);
        if (!cart) {
          setStore({ carts: [...getStore().carts, carts] });
        }
      },
      syncTokenFromSessionStore: () => {
        const token = localStorage.getItem("token");
        if (token && token != "" && token != undefined)
          setStore({ token: token });
      },
      register: async (data) => {
        try {
          const response = await fetch(
            `${process.env.BACKEND_URL}/api/register`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(data),
            }
          );
          if (response.ok) {
            console.log("Registro exitoso");
            return true;
          } else {
            console.log("Error al registrarse");
            return false;
          }
        } catch (error) {
          console.log(error);
        }
      },
      logIn: async (email, password) => {
        const opts = {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(email, password),
        };
        try {
          const resp = await fetch(
            `${process.env.BACKEND_URL}/api/login`,
            opts
          );
          if (!resp.ok) {
            getActions().alertmessage("Credenciales Invalidas");
            return false;
          }
          let data = await resp.json();
          localStorage.setItem("token", data.token);
          setStore({ token: data.token });
          localStorage.setItem("user_id", data.user_id);
          setStore({ user_id: data.user_id });

          getActions().getUser(data.user_id);

          return true;
        } catch (error) {
          console.log("Ha habido un error en el login", error);
        }
      },
      alertmessage: (message) => {
        setStore({ message: `${message}` });
      },
      logOut: async () => {
        localStorage.removeItem("token");
        setStore({ token: null });
        localStorage.removeItem("user_id");
        setStore({ user_id: "", gettingcartbyid: "" });
        return true;
      },
      getUser: async (user_id) => {
        try {
          let response = await fetch(`${getStore().urlBase}/user/${user_id}`);
          let data = await response.json();

          setStore({ userData: data });
        } catch (error) {
          console.log(error);
        }
      },
    },
  };
};

export default getState;
