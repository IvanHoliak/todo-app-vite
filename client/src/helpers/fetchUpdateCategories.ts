import axios from "axios";
import { ICategory } from "../interfaces";

type TUpdateCategories = (id: string, categories: ICategory[]) => void;

export const fetchUpdateCategories: TUpdateCategories = async(id, categories) => {
    try {
        const response = await axios.post("/api/update_categories", {
            id,
            categories
        });

        if(!response){
            throw new Error("Ошибка при обновлении данных. Повторите попытку позже.");
        };
        console.log(response.data.message);
    }catch(e: any){
        console.log(e.message);
    };
};