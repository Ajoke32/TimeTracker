import "./radiobuttons.css"


export const RadioButton = () => {

    return (
        <div className="radio-button__wrapper">
            <div>
                <label>
                    <input type="radio" name="radio" />
                    <span>Full-time</span>
                </label>
                <label>
                    <input type="radio" name="radio" />
                    <span>Part-time</span>
                </label>
            </div>
        </div>
    );
};