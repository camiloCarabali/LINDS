import { Response } from "express";
import { db } from "./config/firebase";

type TravelType = {
    latitud: string,
    longitud: string
}

type Request = {
    body: TravelType,
    params: { travelId: string }
}

export const addTravel = async (req: Request, res: Response) => {
    const { latitud, longitud } = req.body
    try {
        const travel = db.collection('travel').doc()
        const travelObject = {
            id: travel.id,
            latitud,
            longitud
        }

        travel.set(travelObject);

        res.status(200).send({
            status: 'success',
            message: 'travel added successfully',
            data: travelObject
        })
    } catch(error){
        res.status(500).json(error);
    }
}