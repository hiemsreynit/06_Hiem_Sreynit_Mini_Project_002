export async function registerAction(data) {
  try {
    const validatedData = RegisterSchema.parse(data);

    const result = await registerService(
      validatedData.fullName,
      validatedData.email,
      validatedData.password,
    );

    return result;
  } catch (error) {
    if (error instanceof ZodError) {
      return {
        success: false,
        message: "Validation failed",
        errors: error.errors.map((err) => ({
          field: err.path.join("."),
          message: err.message,
        })),
      };
    }

    return {
      success: false,
      message: error?.message || "An error occurred during registration",
    };
  }
}

export async function getProfileDataAction(data) {
  try {
    const validatedData = RegisterSchema.parse(data);
    
    const result = await registerService(
      validatedData.fullName,
      validatedData.email,
      validatedData.password
    );

    return result;
  } catch (error) {
    if (error instanceof ZodError) {
      return {
        success: false,
        message: "Validation failed",
        errors: error.errors.map((err) => ({
          field: err.path.join("."),
          message: err.message,
        })),
      };
    }

    return {
      success: false,
      message: error?.message || "An error occurred during registration",
    };
  }
  
}
