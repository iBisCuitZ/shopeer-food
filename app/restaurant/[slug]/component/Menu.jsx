import MenuCard from "./MenuCard";

export default function Menu(props) {

    return (
        <main className="bg-white mt-5">
            <div>
                <div className="mt-4 pb-1 mb-1">
                    <h1 className="font-bold text-4xl">Menu</h1>
                </div>
                <div className="flex flex-wrap justify-between">
                    {props.menu.map(props => {
                        return <MenuCard menu={props}></MenuCard>
                    })}
                </div>
            </div>
        </main>
    )
};
