# Document Approval System API Documentation

## Table of Contents

-   [User Management](#user-management)
-   [File Operations](#file-operations)
-   [Department Management](#department-management)
-   [Notifications](#notifications)
-   [Assistant Management](#assistant-management)
-   [Admin Operations](#admin-operations)

## User Management

### Sign Up

-   **Endpoint**: `POST /user/signup`
-   **Access**: Public
-   **Request Body**:

```json
{
    "username": "string",
    "email": "string",
    "password": "string",
    "fullName": "string",
    "mobileNo": "number"
}
```

### Sign In

-   **Endpoint**: `POST /user/signin`
-   **Access**: Public
-   **Request Body**:

```json
{
    "username": "string",
    "password": "string",
    "deviceToken": "string"
}
```

### Sign Out

-   **Endpoint**: `POST /user/signout`
-   **Access**: Authenticated Users
-   **Description**: Invalidates user session

### Sign Out All Devices

-   **Endpoint**: `POST /user/signout-all`
-   **Access**: Authenticated Users
-   **Description**: Invalidates all user sessions across devices

### Verify OTP

-   **Endpoint**: `POST /user/verify-otp`
-   **Access**: Public
-   **Request Body**:

```json
{
    "username": "string",
    "otp": "string"
}
```

### Resend OTP

-   **Endpoint**: `POST /user/resend-otp`
-   **Access**: Public
-   **Request Body**:

```json
{
    "username": "string",
    "email": "string"
}
```

### Password Reset Flow

#### 1. Send Password Reset OTP

-   **Endpoint**: `POST /user/send-password-reset-otp`
-   **Access**: Public
-   **Request Body**:

```json
{
    "email": "string"
}
```

#### 2. Verify Special OTP

-   **Endpoint**: `POST /user/verify-sp-otp`
-   **Access**: Public
-   **Request Body**:

```json
{
    "email": "string",
    "otp": "string"
}
```

#### 3. Reset Password

-   **Endpoint**: `POST /user/reset-password`
-   **Access**: Users with valid special token
-   **Request Body**:

```json
{
    "newPassword": "string"
}
```

### Change Password (Authenticated)

-   **Endpoint**: `POST /user/change-password`
-   **Access**: Authenticated Users
-   **Request Body**:

```json
{
    "oldPassword": "string",
    "newPassword": "string"
}
```

### Change User Status

-   **Endpoint**: `POST /user/change-user-status`
-   **Access**: Admin, Senior Assistant
-   **Request Body**:

```json
{
    "username": "string",
    "isActive": "boolean"
}
```

### Get Assistants

-   **Endpoint**: `GET /user/get-assistants`
-   **Access**: Approver
-   **Description**: Returns list of assistants assigned to the approver

### Update Profile

-   **Endpoint**: `POST /user/update-profile`
-   **Access**: Authenticated Users
-   **Request Body**:

```json
{
    "fullName": "string",
    "email": "string",
    "mobileNo": "string"
}
```

## File Operations

### Upload PDF

-   **Endpoint**: `POST /file/upload-pdf`
-   **Access**: Senior Assistant, Assistant
-   **Content-Type**: multipart/form-data
-   **Request Body**:

```json
{
    "pdfFile": "file",
    "department": "string",
    "title": "string",
    "description": "string (optional)"
}
```

### Download PDF

-   **Endpoint**: `GET /file/download-pdf/:filename`
-   **Access**: Assistant, Senior Assistant, Approver, Admin
-   **Parameters**: filename (path parameter)

### Get Documents

-   **Endpoint**: `GET /file/get-documents`
-   **Access**: All authenticated roles
-   **Query Parameters**:

```json
{
    "department": "string",
    "startDate": "date",
    "endDate": "date",
    "sortBy": "string",
    "status": "string",
    "createdBy": "string",
    "assignedTo": "string"
}
```

### Document Status Updates

-   **Approve Document**: `POST /file/approve`
-   **Reject Document**: `POST /file/reject`
-   **Request Correction**: `POST /file/correction`
-   **Access**: Approver
-   **Request Body**:

```json
{
    "fileUniqueName": "string",
    "remarks": "string (required for correction)"
}
```

## Department Management

### Get All Departments

-   **Endpoint**: `GET /department/get-all-departments`
-   **Access**: Senior Assistant, Assistant, Admin

### Add Department

-   **Endpoint**: `POST /department/add-department`
-   **Access**: Admin, Senior Assistant, Assistant
-   **Request Body**:

```json
{
    "departmentName": "string"
}
```

## Notifications

### Get Notifications

-   **Endpoint**: `GET /notification/get-notifications`
-   **Access**: Senior Assistant, Assistant, Approver

### Mark Notifications as Seen

-   **Endpoint**: `POST /notification/mark-seen`
-   **Access**: Senior Assistant, Assistant, Approver

## Assistant Management

### Create User

-   **Endpoint**: `POST /assistant/create-user`
-   **Access**: Senior Assistant
-   **Request Body**:

```json
{
    "username": "string",
    "password": "string",
    "fullName": "string",
    "email": "string",
    "mobileNo": "string",
    "role": "string (ASSISTANT or APPROVER)"
}
```

### Get Created Assistants

-   **Endpoint**: `GET /assistant/get-created-assistants`
-   **Access**: Senior Assistant

### Get Approver

-   **Endpoint**: `GET /assistant/get-approver`
-   **Access**: Senior Assistant, Assistant

## Admin Operations

### Get Users by Role

-   **Endpoint**: `GET /admin/get-users`
-   **Access**: Admin
-   **Query Parameters**:

```json
{
    "role": "string"
}
```

### Get All Users

-   **Endpoint**: `GET /admin/get-all-users`
-   **Access**: Admin

### Create Approver

-   **Endpoint**: `POST /admin/create-approver`
-   **Access**: Admin
-   **Description**: Creates a new approver and assigns them to a senior assistant
-   **Request Body**:

```json
{
    "username": "string",
    "fullName": "string",
    "mobileNo": "string",
    "email": "string",
    "password": "string",
    "role": "APPROVER",
    "seniorAssistantUsername": "string"
}
```

### Create Senior Assistant

-   **Endpoint**: `POST /admin/create-sr-assistant`
-   **Access**: Admin
-   **Description**: Creates a new senior assistant to replace a deactivated one
-   **Request Body**:

```json
{
    "username": "string",
    "fullName": "string",
    "mobileNo": "string",
    "email": "string",
    "password": "string",
    "role": "SENIOR_ASSISTANT",
    "oldSrAssistantUsername": "string"
}
```

## Common Response Codes

-   200: Success
-   201: Created
-   400: Bad Request
-   401: Unauthorized
-   403: Forbidden
-   404: Not Found
-   500: Internal Server Error

## Role Types

-   ADMIN
-   APPROVER
-   SENIOR_ASSISTANT
-   ASSISTANT

## File Status Types

-   PENDING
-   APPROVED
-   REJECTED
-   CORRECTION
