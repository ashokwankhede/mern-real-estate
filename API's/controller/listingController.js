import Listing from '../models/listingModel.js';


export const createListing = async (req,res,next) =>{
    try{

        const listing = await Listing.create(req.body);
        console.log(listing);
        res.status(201).json({
            status:true,
            listing
        });
    }
    catch (err){
        next(err);
    }

};

