import cors from "cors";

const corsOption = {
    origin: ['http://localhost:3000'],
    optionsSuccessStatus: 200
};

const corsMiddleware = cors(corsOption);

export default corsMiddleware;