import Code from "../model/code.js";

export const saveCode = async (request, response) => {
  try {
    const update = await Code.findOne({ roomID: request.body.roomID });

    if(update){
      await Code.findOneAndUpdate(
        { roomID: request.body.roomID },
        { 
          $set: {
            code: request.body.Code,
            date: new Date()
          } 
        }
      );
      return response.status(200).json({ msg: "Code Updated successfully" });
    }

    const code = { code: request.body.Code, roomID: request.body.roomID, savedDate: new Date() };

    const newCode = new Code(code);
    await newCode.save();

    return response.status(201).json({ msg: "Code Saved successfully" });
  } catch (error) {
    return response.status(500).json({ msg: "Error while Saving the Code" });
  }
};


export const deleteCode = async (request, response) => {
  try {
    const code = await Code.findOneAndDelete({ roomID: request.params.id });
    
    if (!code) {
      return response.status(404).json('No Saved Code Found');
    }
    
    response.status(200).json("Saved Code deleted successfully");
  } catch (error) {
    response.status(500).json(error);
  }
};

export const getCode = async (request, response) => {
  try {
    const code = await Code.findOne({ roomID: request.params.id });

    if (!code) {
      return response.status(404).json({ msg: `No Saved Code on Room ID ${request.params.id}` });
    }

    response.status(200).json(code);
  } catch (error) {
    console.error(error); // Log the error for debugging
    response.status(500).json({ msg: 'Error while retrieving the code', error });
  }
};

