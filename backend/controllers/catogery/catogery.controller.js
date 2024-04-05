import { pool } from "../../database/db.js";




export const createNewCategory = async (req, res) => {
    try {

        const { category } = req.body;
        const query = {
            text: "INSERT INTO category(category,is_active) VALUES($1,$2) RETURNING *",
            values: [category, true]
        };
        pool.query(query, (error, result) => {
            if (error) {
                return res.status(403).json({
                    error: error,
                    success: false,
                });
            }

            if (result != null) {

                return res.status(201).json({
                    success: true,
                    message: "Created New category",
                    data: result.rows
                });
            }

        });

    } catch (error) {
        console.log(error);
        return res
            .status(500)
            .json({ error: error, success: false, message: "Something went wrong." });
    }
};


export const getAllCategories = async (req, res) => {

    try {

        const data = await pool.query('SELECT * FROM category WHERE is_active=true');



        if (data.rowCount != 0 | null) {

            return res.status(200).json({
                success: true,
                message: "fetched catogeries",
                count: data.rowCount,
                data: data.rows
            });
        } else {
            return res
                .status(400)
                .json({ success: false, message: "No data found." });
        }

    } catch (error) {
        console.log(error);
        return res
            .status(500)
            .json({ error: error, success: false, message: "Something went wrong." });
    }


};


export const editCategory = async (req, res) => {


    try {
        const body = req.body;

        const query = {
            text: "UPDATE category SET  category=($2) WHERE id=($1) RETURNING *",
            values: [body.id, body.category]
        };

        const data = await pool.query(query);

        if (data.rowCount != 0 | null) {

            return res.status(200).json({
                success: true,
                message: "catogery updated",
                count: data.rowCount,
                data: data.rows
            });
        } else {
            return res
                .status(400)
                .json({ success: false, message: "No data found." });
        }

    } catch (error) {
        console.log(error);
        return res
            .status(500)
            .json({ error: error, success: false, message: "Something went wrong." });
    }


};

export const deleteCategory = async (req, res) => {

    try {
        const body = req.body;
        const query = {
            text: "UPDATE category SET is_active=FALSE  WHERE id=($1)",
            values: [body.id]
        };

        const data = pool.query(query, (error, result) => {
            if (error) {
                return res.status(400).json({
                    error: error.message,
                    success: false,
                });
            }

            if (result) {
                return res.status(200).json({
                    message: 'Category succesfully deleted', success: true
                });
            }
        });
        // console.log(data);

        // res.status(200).json({
        //     message: 'Category succesfully deleted', success: true
        // });



    } catch (error) {
        console.log(error);
        return res
            .status(500)
            .json({ error: error, success: false, message: "Something went wrong." });
    }


};