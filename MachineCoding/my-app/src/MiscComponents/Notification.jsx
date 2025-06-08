import { useEffect, useState } from "react";

// WRAP this component in the main parent and in this component add the context and render the children here and
// then provide the sendNotification method as value of context, so that its available everywhere and then
// futher to use it as hook in this file i could write
// export const useToast = () => useContext(ToastContext);
// and import this hook anywhere in my app.
//
const Notification = () => {
  const [notes, setNotes] = useState([]);

  //   useEffect(() => {
  //     let timer;
  //     if (notes.length > 0) {
  //       timer = setTimeout(() => {
  //         console.log("i am only working when there is notification");
  //         const currDate = Date.now();
  //         setNotes((old) => old.filter((note) => currDate - note.date < 4000));
  //       }, 1000);
  //     }
  //     return () => {
  //       clearTimeout(timer);
  //     };
  //   }, [notes]);

  const sendNotification = () => {
    let id = Math.floor(Math.random() * 100000);
    setNotes((n) => [
      ...n,
      {
        id,
        message: `New Random Notification ${id}`,
        date: Date.now(),
      },
    ]);

    setTimeout(() => {
      setNotes((old) => old.filter((note) => id !== note.id));
    }, 2000);
    // rather than using useEffect i could i have simply invoked setTimout
    //  here with filter of that id , so that is removed after timeout and thats it
    // each notification will have its own timeout.
  };

  return (
    <div>
      <button onClick={() => sendNotification()}>Notify</button>
      <div className="notitification-panel">
        {notes.map((note) => (
          <div className="notification-block" key={note.id}>
            {note.message}
          </div>
        ))}
      </div>
    </div>
  );
};
export default Notification;
