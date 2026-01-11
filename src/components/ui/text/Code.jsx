// https://www.w3schools.com/tags/tag_pre.asp
// https://www.w3schools.com/tags/tag_code.asp
export {Code}

function Code(
    { children }, 
    ...props
) {
    return (
        <pre><code {...props}>{children}</code></pre>
    );
}