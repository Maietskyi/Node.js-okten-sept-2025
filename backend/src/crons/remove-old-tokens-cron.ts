import { config } from "../configs/config";

const handler = async () => {
    try {
        const lifeTime = config.JWT_REFRESH_LIFETIME;
    
    } catch (err) {
        console.error("e.message");
    }
};