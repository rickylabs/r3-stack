"use client";

import {AnalyticsProvider, UmamiAnalyticsProvider,} from "./AnalyticsProvider/AnalyticsProvider";
import React, {type PropsWithChildren} from "react";

export function Providers({children}: PropsWithChildren) {
    return (
        <>
            {children}
            <AnalyticsProvider/>
            <UmamiAnalyticsProvider/>
        </>
    );
}
