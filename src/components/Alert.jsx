import React from "react";

export const Alert = () => {
    return (
        <div class="alert alert-success d-flex align-items-center" role="alert">
            <svg class="bi flex-shrink-0 me-2" role="img" aria-label="Success:"><use xlink:href="#check-circle-fill" /></svg>
            <div>
                City was successfully found!
            </div>
        </div>
    )
}