import { createElement } from "react";

function InnerHtml({ html }) {
    const doc = new DOMParser().parseFromString(html, 'text/html');
    return (
        <>
            {
                [...doc.body.children].length > 0 ? [...doc.body.children].map((tag, index) => (
                     <div key={index}>{createElement(tag.localName, null, tag.innerHTML)}</div>
                )) : doc.body.textContent
            }
        </>
    )
}

export default InnerHtml;