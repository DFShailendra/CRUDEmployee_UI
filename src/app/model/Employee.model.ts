export class Employee{
    public employeeId: number;
    public name: string;
    public city: string;
    public department: number;
    public gender: number;
    public phoneNumber: number;

    // constructor(EmployeeId: number,Name: string,City: string,Department: number,Gender: number,phone: number){
    //     this.EmployeeId=EmployeeId;
    //     this.Name=Name;
    //     this.City=City;
    //     this.Department=Department;
    //     this.Gender=Gender;
    //     this.phone=phone;
    // }

    constructor(employee:Employee){
        // employee = Employee || {};
        this.employeeId=employee?.employeeId || 0;
        this.name=employee?.name || '';
        this.city=employee?.city || '';
        this.department=employee?.department || 0;
        this.gender=employee?.gender || 0;
        this.phoneNumber=employee?.phoneNumber || 0;
    }
}

export class RRF{
    public rrfId: number;
    public managerId:number;
    public clientId:number;
    public projectId:number;
    public submissionDate: Date;
    public roleId:number; 
    public isBillable:number; 
    public billingRate:number; 
    public billingStartDate: Date; 
    public positionTypeId:number; 
    public isInternalResourceId:number; 
    public identifiedResourceId:number;  
    public numberOfPositionId:number; 
    public payroleTypeId:number; 
    public approvedByResourceId:number; 
    public primaryTechnologies:string; 
    public minimumYearsOfExperienceId:number;
    public mandatorySkills:string[];
    public niceToHaveSkills:string[];
    public jobLocation:string;
    public isRemotelyId:number;
    public interviewByResourceId: number;
    public jobDescription:string;
    public otherInputs:string;
    public remark: string;
    public createBy: string;
    public createDate: Date;
    public updateBy: string;
    public updateDate: Date;

    public managerName:string;
    public clientName:string;
    public projectName:string;
    public approvalManager:string;
    public interviewManager:string;
    public roleName:string;

    /**
     *
     */
    constructor(rrf:RRF) {
        this.rrfId=rrf?.rrfId || 0;
        this.managerId=rrf?.managerId || 0;
        this.projectId=rrf?.projectId || 0;
        this.clientId=rrf?.clientId || 0;
        this.submissionDate=rrf?.submissionDate|| '';
        this.roleId=rrf?.roleId || 0;
        this.isBillable=rrf?.isBillable || 0;
        this.billingRate=rrf?.billingRate || 0;
        this.billingStartDate=rrf?.billingStartDate|| '';
        this.positionTypeId=rrf?.positionTypeId || 0;
        this.isInternalResourceId=rrf?.isInternalResourceId || 0;
        this.identifiedResourceId=rrf?.identifiedResourceId || 0;
        this.numberOfPositionId=rrf?.numberOfPositionId || 0;
        this.payroleTypeId=rrf?.payroleTypeId|| 0;
        this.approvedByResourceId=rrf?.approvedByResourceId|| 0;
        this.primaryTechnologies=rrf?.primaryTechnologies|| '';
        this.minimumYearsOfExperienceId=rrf?.minimumYearsOfExperienceId|| 0;
        this.mandatorySkills=rrf?.mandatorySkills|| [''];
        this.niceToHaveSkills=rrf?.niceToHaveSkills|| [''];
        this.jobLocation=rrf?.jobLocation|| '';
        this.isRemotelyId=rrf?.isRemotelyId|| 0;
        this.interviewByResourceId=rrf?.interviewByResourceId|| 0;
        this.jobDescription=rrf?.jobDescription|| '';
        this.otherInputs=rrf?.otherInputs|| '';
        this.remark=rrf?.remark|| '';
        this.createBy=rrf?.createBy|| '';
        this.createDate=rrf?.createDate|| '';
        this.updateBy=rrf?.updateBy|| '';
        this.updateDate=rrf?.updateDate|| '';
        this.managerName=rrf?.managerName|| '';
        this.clientName=rrf?.clientName|| '';
        this.projectName=rrf?.projectName|| '';
        this.approvalManager=rrf?.approvalManager|| '';
        this.interviewManager=rrf?.interviewManager|| '';
        this.roleName=rrf?.roleName|| '';
    }
}

export class gender{
    public genderId: number;
    public genderName: string;
    public isActive: number;

    constructor(gender: gender) {
        this.genderId=gender?.genderId || 0;
        this.genderName=gender?.genderName || '';
        this.isActive=gender?.isActive || 0;
    }
}

export class department{
    public departmentId: number;
    public departmentName: string;
    public isActive: number;

    constructor(department: department) {
        this.departmentId=department?.departmentId || 0;
        this.departmentName=department?.departmentName || '';
        this.isActive=department?.isActive || 0;
    }
}


export class DDL{
    public id:number;
    public value:string;
    constructor(ddl: DDL) {
        this.id=ddl?.id || 0;
        this.value=ddl?.value|| '';
        }
}

export class getDDL{
    resources!: DDL[];
    clients!:DDL[];
    roles!:DDL[];
    billables!:DDL[];
    isInternalResource!:DDL[];
    positionTypes!:DDL[];
    numberOfPosition!:DDL[];
    isRemotely!:DDL[];
    minimumYearsOfExperience!:DDL[];
    payroleType!:DDL[];
    project!:DDL[];
    mandatorySkills!:DDL[];
    niceToHaveSkills!:DDL[];

    constructor(getddl:getDDL) {
        this.clients = getddl?.clients|| [];
        this.resources = getddl?.resources|| [];
        this.roles = getddl?.roles|| [];
        this.billables = getddl?.billables|| [];
        this.isInternalResource = getddl?.isInternalResource|| [];
        this.positionTypes = getddl?.positionTypes|| [];   
        this.numberOfPosition = getddl?.numberOfPosition|| [];  
        this.payroleType= getddl?.payroleType|| [];           
        this.minimumYearsOfExperience = getddl?.minimumYearsOfExperience|| [];           
        this.isRemotely = getddl?.isRemotely|| [];   
        this.project = getddl?.project|| [];   
        this.mandatorySkills= getddl?.mandatorySkills|| [];  
        this.niceToHaveSkills= getddl?.niceToHaveSkills|| [];           

    }
}