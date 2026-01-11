
export {Honeypot};
function Honeypot() {
    return (
        <input 
            type="text" 
            name="website" 
            style={{ display: 'none' }}
            tabIndex="-1"
            autoComplete="off"
        />
    );
}