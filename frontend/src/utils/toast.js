const notify = (toast, message, type) => {
    toast(message, {
      type: type,
      position: "top-center",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      theme: "colored",
    });
  };
  
  export default notify;
  