import Card from "./Card";
import Form from "./Form";

export default function Home() {
    return (
        <>
            <div className="glass border-slate-500 border-[1px] w-fit mx-auto p-4 rounded-md">
                <div className="max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-8 mx-auto">
                    <div className="my-auto  ">
                        <Card />
                    </div>
                    <div className="md:border-slate-700 md:border-s-2 md:border-opacity-20">
                        <Form />
                    </div>
                </div>
            </div></>
    )
}
