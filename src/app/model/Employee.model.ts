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

export class getDDL{
    genderDDL: gender[];
    departmentDDL: department[];
    
    constructor(getddl:getDDL) {
        this.genderDDL = getddl?.genderDDL || [];
        this.departmentDDL = getddl?.departmentDDL || [];
    }
}