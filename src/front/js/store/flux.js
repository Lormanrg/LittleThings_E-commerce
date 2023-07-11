const getState = ({ getStore, getActions, setStore }) => {
  return {
    store: {
      token: null,
      urlBase: "http://localhost:3001/api",
      message: { text: "", type: false },
      postperfumes: [],
      postshirts: [],
      postaccesorios: [],
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
          console.log(data);
          setStore({
            postshirts: data,
          });
        } catch (error) {
          console.log(`${error}error`);
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
      logIn: async (data) => {
        console.log(data);
        const opts = {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
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
          const data = await resp.json();
          setStore({ token: data.token });

          localStorage.setItem("token", data.token);
          return true;
        } catch (error) {
          console.error("Ha habido un error en el login");
        }
      },
      alertmessage: (message) => {
        setStore({ message: `${message}` });
      },
      logOut: async () => {
        localStorage.removeItem("token");
        setStore({ token: null });
        return true;
      },
    },
  };
};

export default getState;
