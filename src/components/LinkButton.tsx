import { Link } from "react-router-dom"

const LinkButton = ({ to, children, classList }: { to: string, children: any, classList: string }) => {
    return (
        <Link to={to} className={`btn ${classList}`}>{children}</Link>    
    )
};

export default LinkButton