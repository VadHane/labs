import config from "../config.js";

export default (req, res, next) => {
    res = next(req)
    res.set(
        {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": config.ORIGIN_UI_ADDRESS,
        }
    )
    res.end();
    
};