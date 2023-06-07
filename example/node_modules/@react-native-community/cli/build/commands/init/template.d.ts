import execa from 'execa';
export declare type TemplateConfig = {
    placeholderName: string;
    templateDir: string;
    postInitScript?: string;
    titlePlaceholder?: string;
};
export declare function installTemplatePackage(templateName: string, root: string, npm?: boolean): Promise<execa.ExecaReturns>;
export declare function getTemplateConfig(templateName: string, templateSourceDir: string): TemplateConfig;
export declare function copyTemplate(templateName: string, templateDir: string, templateSourceDir: string): Promise<void>;
export declare function executePostInitScript(templateName: string, postInitScript: string, templateSourceDir: string): execa.ExecaChildProcess;
//# sourceMappingURL=template.d.ts.map