export interface IUserRepository {
    registerUser(
      firstName: string,
      lastName: string,
      userName: string,
      email: string,
      password: string,
      extraFields?: Record<string, any>
    ): Promise<{ success: boolean; message: string; userId?: string; verifyCode?: string }>;
    
    verifyUser(userName: string, code: string): Promise<{ success: boolean; message: string }>;
  
    forgotPassword(email: string, url: string): Promise<{ success: boolean; message: string; resetLink?: string }>;
  
    resetPassword(token: string, newPassword: string): Promise<{ success: boolean; message: string }>;

    updateUserFields(userId: string, extraFields: Record<string, any>): Promise<{ success: boolean; message: string ; user:any }>;
  }

  