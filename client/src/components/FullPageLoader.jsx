import classes from "./FullPageLoader.module.css";

const FullPageLoader = () => {
    return (
        <div className="h-full grid place-content-center">
            <div className={classes.loader}>
                <svg viewBox="25 25 50 50" className={classes.circular}>
                    <circle cx="50" cy="50" r="20" fill="none" strokeWidth="2" strokeMiterlimit="10" className={classes.path}></circle>
                </svg>
            </div>
        </div>
    );
};

export default FullPageLoader;
