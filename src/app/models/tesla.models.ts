export class StandardColor {
    code: string | undefined;
    description: string | undefined;
    price: number | undefined;
}
export class StandardModel {
    code: string | undefined;
    colors: StandardColor[] | undefined;
    description: string | undefined;
    imageurl: string | undefined;
}
export class ConfigDetails {
    description: string | undefined;
    id: number | undefined;
    price: number | undefined;
    range: number | undefined;
    speed: number | undefined;
}
export class ConfigOptions {
    configs : ConfigDetails[] | undefined;
    towHitch : boolean | undefined;
    yoke: boolean | undefined;

}

export class DataModel {
    imageurl : string | undefined;
    model : string | undefined;
    details: StandardModel | undefined;
    color: string | undefined;
}

export class ConfigModel {
    configDetails: ConfigDetails | undefined;
    description: string | undefined;
    towHitch: boolean | undefined;
    yoke:boolean | undefined;
}

export class AppReducer {
    data: DataModel | undefined;
}
export class ConfigReducre {
    model: ConfigModel | undefined
}



