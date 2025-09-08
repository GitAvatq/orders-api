import { Request, Response } from "express";
declare const _default: {
    getProductsAsync: (req: Request, res: Response) => Promise<void>;
    createProductAsync: (req: Request, res: Response) => Promise<void>;
    deleteProductAsync: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
    modifyProductAsync: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
};
export default _default;
//# sourceMappingURL=orders.controllers.d.ts.map