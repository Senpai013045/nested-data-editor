import { Field } from "./types";

export const fields: Field[] = [
    {
        id: "1",
        name: "maths",
        subFields: [
            {
                id: "1.1",
                name: "geometry",
                subFields: [
                    {
                        id: "1.1.1",
                        name: "measurements",
                    },
                    {
                        id: "1.1.2",
                        name: "coordinates",
                        subFields: [
                            {
                                id: "1.1.2.1",
                                name: "transformations",
                            },
                        ]
                    }
                ]
            }
        ]
    },
    {
        id: "2",
        name: "science",
        subFields: [
            {
                id: "2.1",
                name: "biology",
                subFields: [
                    {
                        id: "2.1.1",
                        name: "cellular",
                    },
                    {
                        id: "2.1.2",
                        name: "biochemistry",
                        subFields: [
                            {
                                id: "2.1.2.1",
                                name: "metabolism",
                            },
                        ]
                    }
                ]

            }
        ]
    }
]