import TherapistPortal from "./TherapistPortal/TherapistPortal"
import "./Sidebar.css";

function Sidebar() {
    return <>
        <section className="sidebar">
            <div className="logo-container">
                {/* <h3>Filter Search:</h3> */}
            </div>

            <TherapistPortal />

        </section>
    </>
}

export default Sidebar
