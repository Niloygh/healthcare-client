export default function DashboardLayout({ children }) {
    return (
        <div className="">
            <div className="flex " >
                <div className="border w-[200px] h-screen ">sidebar</div>
            <div className="w-full">
                <div className="w-full" >{children}</div>
            </div>
            </div>
        </div>
    )
}