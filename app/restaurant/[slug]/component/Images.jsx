export default function Images(props) {
    return (
        <div>
            <h1 className="font-bold text-3xl mt-10 mb-7 border-b pb-5">
                {props.data.length} photos
            </h1>
            <div className="flex flex-wrap ">
                {props.data.map(image => (
                    <img
                        className="w-56 h-44 mr-1 mb-1 hover:scale-105 transition-all rounded-md p-1"
                        src={image}
                        alt=""
                    />
                ))}
            </div>
        </div>
    )
};
