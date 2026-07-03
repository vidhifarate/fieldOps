import { Server, Socket } from "socket.io"

export let io :Server;

export const initializeSocket= (socketServer:Server)=>{
  io=socketServer;
  io.on("connection",(socket)=>{
    console.log(`connected to sockets ${socket.id}`);

    //join chat room 
    socket.on("join_job",(jobId:string)=>{
      socket.join(`job_${jobId}`);
      console.log(`${socket.id} joined chat room :${JSON.stringify(jobId)}`);
      //leave room
      socket.on("leave_job", (jobId: string) => {
      socket.leave(`job_${jobId}`);
      console.log(` ${socket.id} left room `);
    });
    socket.on("disconnect", () => {
      console.log(` Disconnected socket : ${socket.id}`);
    })
  })
}
  )};


