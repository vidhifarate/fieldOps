import type { Router } from "express";

export class Route{
  private static registeredRoutes:string[]=[];

  constructor(public path : string , public router :Router){
    if(!path.startsWith("/") )throw new Error (`path ${this.path} should start with '/' `);

    if(Route.registeredRoutes.includes(this.path)) throw new Error ("Path already registered ");

    Route.registeredRoutes.push(this.path );

  }
}

export type Routes= Route[];