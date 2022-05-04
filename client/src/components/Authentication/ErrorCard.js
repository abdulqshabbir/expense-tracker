export default function ErrorCard({ message }) {
    if (message === "") return null

    return (
        <div className="h-10 mb-4 rounded-md text-[1rem] flex justify-center items-center font-light bg-red-200">
            <p>{ message }</p>
        </div>
    )
}
