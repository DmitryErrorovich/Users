import qs from "qs";

export const getPaginationPage = (str: string) => {
    if (typeof str !== "string") {
        return 1
    }

    const {page = 1} = qs.parse(str.replace("?", ""))
    return  +page

}