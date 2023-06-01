const getState = ({ getStore, getActions, setStore }) => {
  return {
    store: {
      token: null,
    },
    actions: {
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
        const opts = {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        };
        try {
          const resp = await fetch(`${process.env.BACKEND_URL}/api/login`);
          if (!resp.ok) {
            getActions().alertmessage("Credenciales Invalidas");
            return false;
          }
          const data = await resp.json();
          setStore({ token: data.token });

          localStorage.setItem("token", data.token);
          setStore({ message: null });
          return true;
        } catch (error) {
          console.error("Ha habido un error en el login");
        }
      },
      alertmessage: (message) => {
        setStore({ message: `${message}` });
      },
    },
  };
};

export default getState;
