const getState = ({ getStore, getActions, setStore }) => {
  return {
    store: {},
    actions: {
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
    },
  };
};

export default getState;
