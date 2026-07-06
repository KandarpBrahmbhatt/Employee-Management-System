import { Request, Response } from "express"
// import ffmpeg from 'ffmpeg'
import { error } from "node:console"
import ffmpeg from "fluent-ffmpeg";

export const videoCrop = async (req: Request, res: Response) => {
    try {
        console.log(req.body)
        console.log(req.file)

        const {starttime,endtime} = req.body

        const start = Number(starttime)
        const end = Number(endtime)

        if (!req.file) {
            return res.status(500).json({message:"file not found please select the file"})
        }

        if (Number.isNaN(start) || Number.isNaN(end)) {
            return res.status(400).json({message:"starting time and endingtime must be a valid"})
        }

        if (end <=start) {
            return res.status(400).json({message:"start time is larger then end time"})
        }

        const inputPath  = req.file.path
        const outputFileName = `cropped_${Date.now()}.mp4`
        const outputPath = `uploads/${outputFileName}`

        ffmpeg(inputPath)
        .setStartTime(start)
        .setDuration(end -start)
        .output(outputPath)
        .on("end",()=>{
            res.status(200).json({message:"video cropperd sucessfully",video:outputPath})
        })
        .on("error",(error)=>{
            res.status(500).json({message:"video crop error",error})
        })
        .run()
    } catch (error:any) {
        console.log(`videoCrop error ${error}`)
        return res.status(500).json({message:"video crop error",error:error.message})
    }
}