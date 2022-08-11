import { Field } from "./types";

export const fields: Field[] = [
    {
        id: "1",
        name: "field 1",
        subFields: [
            {
                id: "1.1",
                name: "field 1.1",
                subFields: [
                    {
                        id: "1.1.1",
                        name: "field 1.1.1",
                    },
                    {
                        id: "1.1.2",
                        name: "field 1.1.2",
                        subFields: [
                            {
                                id: "1.1.1.1",
                                name: "field 1.1.1.1",
                            },
                        ]
                    }
                ]
            }
        ]
    },
    {
        id: "2",
        name: "field 2",
        subFields: [
            {
                id: "2.1",
                name: "field 2.1",
                subFields: [
                    {
                        id: "2.1.1",
                        name: "field 2.1.1",
                    },
                    {
                        id: "2.1.2",
                        name: "field 2.1.2",
                        subFields: [
                            {
                                id: "2.1.1",
                                name: "field 2.1.1",
                            },
                        ]
                    }
                ]

            }
        ]
    }
]