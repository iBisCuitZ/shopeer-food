import SearchBar from "./SearchBar";


export default function Header() {

    return (
        <div className="h-64 bg-gradient-to-r from-[#0f1f47] to-[#5f6984] p-2 flex justify-center">
            <div className=" text-center ">
                <h1 className="text-white text-5xl font-bold mb-2 h-full flex justify-center items-center">
                    Shopeer Food A food for a Chad
                </h1>
                <SearchBar ></SearchBar>
            </div>
        </div>
    )
};
