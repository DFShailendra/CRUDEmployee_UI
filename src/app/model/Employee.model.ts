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