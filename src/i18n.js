import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      "Dashboard": "Dashboard",
      "Total Tasks": "Total Tasks",
      "Task Count": "Task Count",
      "Completed": "Completed",
      "Projects": "Projects",
      "Total Projects": "Total Projects",
      "Registered Users": "Registered Users",
      "Task Status Distribution": "Task Status Distribution",
      "Project Status Distribution": "Project Status Distribution",
      "User Performance by Tasks": "User Performance by Tasks",
      "User Performance by Projects": "User Performance by Projects",
      "Create Task": "Create Task",
      "Create Project": "Create Project",
      "View Analysis": "View Analysis",
      "Edit Task": "Edit Task",
      "New Task": "New Task",
      "Task Title": "Task Title",
      "Please enter a task title.": "Please enter a task title.",
      "Please enter a task description.": "Please enter a task description.",
      "Customer": "Customer",
      "Please select a customer.": "Please select a customer.",
      "File Upload": "File Upload",
      "Select file": "Select file",
      "Priority Level": "Priority Level",
      "Please select a priority level.": "Please select a priority level.",
      "Please select a category.": "Please select a category.",
      "Project": "Project",
      "Please select a project.": "Please select a project.",
      "Users (Assignees)": "Users",
      "Please select at least one user.": "Please select at least one user.",
      "Update": "Update",
      "Create": "Create",
      "Task successfully updated": "Task successfully updated",
      "Task could not be updated": "Task could not be updated",
      "Loading...": "Loading...",
      "Task successfully created": "Task successfully created.",
      "An error occurred while creating the task.": "An error occurred while creating the task.",
      "Task not found": "Task not found.",
      "Task Error": "Task Error",
      "User Error": "User Error",
      "Customer Error": "Customer Error",
      "At least one user must be selected": "At least one user must be selected.",
      "Comment cannot be empty": "Comment cannot be empty.",
      "Title cannot be empty": "Title cannot be empty.",
      "Comment added successfully": "Comment added successfully.",
      "An error occurred while adding the comment": "An error occurred while adding the comment.",
      "Task status updated": "Task status updated",
      "Task status could not be updated": "Task status could not be updated",
      "Task title updated": "Task title updated.",
      "An error occurred while updating the task title": "An error occurred while updating the task title.",
      "Task successfully deleted": "Task successfully deleted.",
      "An error occurred while deleting the task": "An error occurred while deleting the task.",
      "Assignment": "Assign",
      "Assignment error": "Assignment error",
      "Back": "Back",
      "Go Back": "Go Back",
      "History": "History",
      "Edit": "Edit",
      "Delete": "Delete",
      "Complete Task": "Complete Task",
      "Reopen Task": "Reopen Task",
      "Assignment Tooltip": "Assign",
      "Submit": "Submit",
      "Close": "Close",
      "Close Sidebar": "Close Sidebar",
      "Open Sidebar": "Open Sidebar",
      "Task Management System Pro": "Task Management System Pro",
      "TMS Pro": "TMS Pro",
      "Home": "Home",
      "Tasks": "Tasks",
      "Analytics": "Analytics",
      "Profile": "Profile",
      "Admin Panel": "Admin Panel",
      "Logout": "Logout",
      "Change Theme": "Change Theme",
      "Description": "Description",
      "Created By": "Created By",
      "Category": "Category",
      "Status": "Status",
      "Priority": "Priority",
      "Start Date": "Start Date",
      "End Date": "End Date",
      "Associated Project": "Associated Project",
      "No project for this task": "No project is associated with this task.",
      "Attachments": "Attachments",
      "File": "File",
      "Assigned Users": "Assigned Users",
      "No assignment": "No assignment.",
      "Users to be assigned": "Users to be assigned",
      "All Users": "All Users",
      "Unknown": "Unknown",
      "Not specified": "Not specified",
      "No comments yet": "No comments yet.",
      "Add File": "Add File",
      "Comment": "Comment",
      "Your comment here...": "Your comment here...",
      "Task History": "Task History",
      "No task history": "No task history.",
      "Detail not available": "No detail.",
      "Loading tasks...": "Loading tasks...",
      "Error": "Error",
      "Filter": "Filter",
      "List Tasks": "List Tasks",
      "List Projects": "List Projects",
      "Select User": "Select User",
      "Title": "Title",
      "Assignee": "Assignee",
      "Creator": "Creator",
      "Creation Date": "Creation Date",
      "Project successfully updated": "Project successfully updated",
      "Project could not be updated": "Project could not be updated",
      "Edit Project": "Edit Project",
      "New Project": "New Project",
      "Project Title": "Project Title",
      "Please enter a project title.": "Please enter a project title.",
      "Project Description": "Project Description",
      "Please select start date": "Please select start date.",
      "Please select end date": "Please select end date.",
      "Task list updated!": "Task list updated!",
      "Project list updated!": "Project list updated!",
      "Project successfully created.": "Project successfully created.",
      "An error occurred while creating the project.": "Proje oluşturulurken bir hata oluştu.",
      "There are no project to list.": "There are no project to list.",
      "There are no task to list.": "There are no task to list.",
      "Project status updated": "Project status updated",
      "Project status could not be updated": "Project status could not be updated",
      "Reopen Project": "Reopen Project",
      "Complete Project": "Complete Project",
      "User Assignment": "User Assignment",
      "Some tasks have already been assigned to another project.": "Some tasks have already been assigned to another project.",
      "The task assignment process was completed successfully.": "The task assignment process was completed successfully.",
      "An error occurred while assigning a task.": "An error occurred while assigning a task.",
      "All tasks have been removed.": "All tasks have been removed.",
      "All Tasks": "All Tasks",
      "Already assigned": "Zaten atanmış",
      "No tasks available for this project": "No tasks available for this project",
      "Assign Task": "Assign Task",
      "Tasks assigned to the project": "Tasks assigned To the project",
      "Attached Files": "Attached Files",
      "No attached files found.": "No attached files found.",
      "Error occurred": "Error occurred",
      "Projects Analysis": "Projects Analysis",
      "Projects and tasks detailed analysis": "Detailed analysis about projects and tasks",
      "Completed Projects": "Completed Projects",
      "Ongoing Projects": "Ongoing Projects",
      "Completed Tasks": "Completed Tasks",
      "Ongoing Tasks": "Ongoing Tasks",
      "Users": "Users",
      "Start and end dates": "Start and end dates",
      "No tasks found based on your criteria.": "No tasks found based on your criteria.",
      "Select User(s)": "Select User(s)",
      "Select Status": "Select Status",
      "Incomplete": "Incomplete",
      "Complete": "Complete",
      "Select Date Range": "Select Date Range",
      "No tasks found.": "No tasks found.",
      "Project Analysis": "Project Analysis",
      "Tasks Analysis": "Tasks Analysis",
      "Filtered tasks not found.": "No matching tasks for selected filters.",
      "Firestore info message": "Deletion and editing take place in Firestore. Changing Firebase Authentication requires firebase-admin feature, which is currently not active in this project.",
      "User Management": "User Management",
      "Admin": "Admin",
      "Manager": "Manager",
      "Employees": "Employees",
      "Customers": "Customers",
      "Create User": "Create User",
      "No users found": "No users found.",
      "Project Management": "Project Management",
      "All Projects": "All Projects",
      "No projects found": "No projects found.",
      "Task Management": "Task Management",
      "No tasks found.": "No tasks found.",
      "Name": "Name",
      "Email": "Email",
      "Role": "Role",
      "Operations": "Actions",
      "No one assigned": "No one assigned",
      "Profile Information": "Profile Information",
      "Personnel": "Personnel",
      "Current Password": "Current Password",
      "New Password": "New Password",
      "Confirm New Password": "Confirm New Password",
      "Current password is wrong!": "Current password is wrong!",
      "New passwords do not match!": "New passwords do not match!",
      "Please enter your current password!": "Please enter your current password!",
      "Please enter your new password!": "Please enter your new password!",
      "Password must be at least 6 characters long!": "Password must be at least 6 characters long!",
      "Please confirm your new password!": "Please confirm your new password!",
      "Update Password": "Update Password",
      "New User Registration": "New User Registration",
      "Edit User": "Edit User",
      "Please select user type!": "Please select user type!",
      "Please enter your name!": "Please enter your name!",
      "Email is required": "Email is required",
      "Please enter a valid email": "Please enter a valid email",
      "Phone number is required": "Phone number is required",
      "Phone number must be between 10 and 15 digits": "Phone number must be between 10 and 15 digits",
      "Company Name": "Company Name",
      "Please enter company name!": "Please enter company name!",
      "Password is required": "Password is required",
      "Password must be at least 6 characters long": "Password must be at least 6 characters long",
      "Password must contain at least one uppercase letter": "Password must contain at least one uppercase letter",
      "Password must contain at least one lowercase letter": "Password must contain at least one lowercase letter",
      "Password must contain at least one digit": "Password must contain at least one digit",
      "Save": "Save",
      "User Type": "User Type",
      "NameSurname": "Name and Surname",
      "Phone Number": "Phone Number",
      "Password": "Password",
      "Analysis": "Analysis",
      "Pending": "Pending",
      "Search": "Search",
      "Reset": "Reset",
      "No data found matching your search criteria.": "No data found matching your search criteria.",
      "Project successfully deleted.": "Project successfully deleted.",
      "Task successfully deleted.": "Task successfully deleted.",
      "User successfully deleted.": "User successfully deleted.",
      "Please enter a project description.": "Please enter a project description.",
      "Project History": "Project History",
      "No tasks have been assigned to this project.": "No tasks have been assigned to this project.",
      "List": "List",
      "You can upload multiple files.": "You can upload multiple files.",
      "Category Level": "Category",
      "Upcoming Tasks": "Upcoming Tasks",
      "Latest Added Tasks": "Latest Added Tasks",
      "Latest Added Projects": "Latest Added Projects",
      "confirm": {
        "deleteUserTitle": "Are you sure you want to delete this user?",
        "deleteContent": "This action cannot be undone.",
        "yes": "Yes",
        "no": "No",
        "deleteProjectTitle": "Are you sure you want to delete this project?",
        "deleteTaskTitle": "Are you sure you want to delete this task?",
      },
      "No customer info.": "No customer info.",
      "taskPriorities": {
        "urgent": "Urgent",
        "soon": "Soon",
        "canWait": "Can Wait"
      },
      "taskCategories": {
        "demand": "Demand",
        "error": "Error",
        "meeting": "Meeting"
      },
      "projectPriorities": {
        "high": "High",
        "medium": "Medium",
        "low": "Low"
      },
      "projectCategories": {
        "software": "Software",
        "design": "Design",
        "marketing": "Marketing",
        "finance": "Finance"
      },
      "changedBy": "By {{name}} - {{timestamp}}",
      "history": {
        "assign": "User assigned: {{users}}",
        "unassign": "User unassigned: {{users}}",
        "update": "Updated details: {{details}}",
        "taskAssign": "Tasks assigned: {{tasks}}",
        "taskupdate": "Task updates: {{tasks}}",
        "categoryupdate": "Category updated: {{category}}",
        "priorityupdate": "Priority updated: {{priority}}",
        "statusupdate": "Status updated: {{status}}",
        "unassigntaskupdate": "Tasks unassigned: {{tasks}}",
        "customerupdate": "Customer updated: {{customer}}",
        "titleupdate": "Title updated to: {{title}}",
        "descriptionupdate": "Description updated to: {{description}}",
        "firsthistory": {
          "task": "Task created successfully.",
          "project": "Project created successfully."
        }
      },
      "Assign": "Assign",
      "Click to sort": "Click to sort",
      "Filter": "Filter",
      "There is no data to display.": "There is no data to display.",
      "Select a customer first.": "Select a customer first.",
      "This field cannot be changed.": "This field cannot be changed.",
      "No upcoming tasks.": "No upcoming tasks."

    }
  },
  tr: {
    translation: {
      "Dashboard": "Anasayfa",
      "Total Tasks": "Toplam Görev",
      "Task Count": "Görev Sayısı",
      "Completed": "Tamamlandı",
      "Projects": "Projeler",
      "Total Projects": "Toplam Projeler",
      "Task Status Distribution": "Görev Durumu Dağılımı",
      "Project Status Distribution": "Proje Durumu Dağılımı",
      "User Performance by Tasks": "Görevlere Göre Kullanıcı Performansı",
      "User Performance by Projects": "Projelere Göre Kullanıcı Performansı",
      "Create Task": "Görev Oluştur",
      "Create Project": "Proje Oluştur",
      "View Analysis": "Analizleri Görüntüle",
      "Edit Task": "Görevi Düzenle",
      "New Task": "Yeni Görev Oluştur",
      "Task Title": "Görev Başlığı",
      "Please enter a task title.": "Lütfen görev başlığını girin.",
      "Please enter a task description.": "Lütfen görev açıklamasını girin.",
      "Please select a customer.": "Lütfen bir müşteri seçin.",
      "File Upload": "Dosya Yükleme",
      "Select file": "Dosya Seç",
      "Priority Level": "Öncelik Seviyesi",
      "Please select a priority level.": "Lütfen öncelik seviyesini seçin.",
      "Please select a category.": "Lütfen bir kategori seçin.",
      "Project": "Proje",
      "Please select a project.": "Lütfen bir proje seçin.",
      "Users (Assignees)": "Kullanıcılar",
      "Please select at least one user.": "Lütfen en az bir kullanıcı seçin.",
      "Update": "Güncelle",
      "Create": "Oluştur",
      "Task successfully updated": "Görev başarıyla güncellendi",
      "Task could not be updated": "Görev güncellenemedi",
      "Loading...": "Yükleniyor...",
      "Task successfully created": "Görev başarıyla oluşturuldu.",
      "An error occurred while creating the task.": "Görev oluşturulurken bir hata oluştu.",
      "Task not found": "Görev bulunamadı.",
      "Task Error": "Görev Hatası",
      "User Error": "Kullanıcı Hatası",
      "Customer Error": "Müşteri Hatası",
      "At least one user must be selected": "Atama yapabilmek için en az bir kullanıcı seçmelisiniz.",
      "Comment cannot be empty": "Yorum boş olamaz.",
      "Title cannot be empty": "Başlık boş olamaz.",
      "Comment added successfully": "Yorum başarıyla eklendi.",
      "An error occurred while adding the comment": "Yorum eklenirken bir hata oluştu.",
      "Task status updated": "Görev durumu güncellendi",
      "Task status could not be updated": "Görev durumu güncellenemedi",
      "Task title updated": "Görev başlığı güncellendi.",
      "An error occurred while updating the task title": "Görev başlığı güncellenirken bir hata oluştu.",
      "Task successfully deleted": "Görev başarıyla silindi.",
      "An error occurred while deleting the task": "Görev silinirken bir hata oluştu.",
      "Assignment": "Atama",
      "Assignment error": "Atama hatası",
      "Back": "Geri",
      "Go Back": "Geri",
      "History": "Tarihçe",
      "Edit": "Düzenle",
      "Delete": "Sil",
      "Complete Task": "Görevi Tamamla",
      "Reopen Task": "Görevi Geri Al",
      "Assignment Tooltip": "Atama",
      "Submit": "Gönder",
      "Close": "Kapat",
      "Close Sidebar": "Sidebar Kapat",
      "Open Sidebar": "Sidebar Aç",
      "Task Management System Pro": "Görev Takip Sistemi Pro",
      "TMS Pro": "GTS Pro",
      "Home": "Anasayfa",
      "Tasks": "Görevler",
      "Analytics": "Analitik",
      "Profile": "Profil",
      "Admin Panel": "Admin Panel",
      "Logout": "Çıkış Yap",
      "Change Theme": "Temayı Değiştir",
      "Description": "Açıklama",
      "Created By": "Oluşturan Kişi",
      "Category": "Kategori",
      "Customer": "Müşteri",
      "Status": "Durum",
      "Priority": "Öncelik",
      "Start Date": "Başlangıç Tarihi",
      "End Date": "Bitiş Tarihi",
      "Associated Project": "Bağlı Olduğu Proje",
      "No project for this task": "Bu görev bir projeye bağlı değil.",
      "Attachments": "Ekler",
      "File": "Dosya",
      "Assigned Users": "Atanan Kullanıcılar",
      "No assignment": "Atama yok.",
      "Users to be assigned": "Atanacak kişiler",
      "All Users": "Tüm Kullanıcılar",
      "Unknown": "Bilinmiyor",
      "Not specified": "Belirtilmemiş",
      "No comments yet": "Henüz yorum eklenmemiş.",
      "Add File": "Dosya Ekle",
      "Comment": "Açıklama",
      "Your comment here...": "Yorumunuzu buraya yazın...",
      "Task History": "Görev Tarihçesi",
      "No task history": "Görev tarihçesi bulunmamaktadır.",
      "Detail not available": "Detay yok.",
      "Loading tasks...": "Görevler yükleniyor...",
      "Error": "Hata",
      "No tasks found.": "Görev bulunmamaktadır.",
      "Filter": "Filtre",
      "List Tasks": "Talep Listele",
      "List Projects": "Proje Listele",
      "Select User": "Kullanıcı Seç",
      "Title": "Başlık",
      "Assignee": "Atanan Kişi",
      "Creator": "Oluşturan Kişi",
      "Creation Date": "Oluşturulma Tarihi",
      "Project successfully updated": "Proje başarıyla güncellendi",
      "Project could not be updated": "Proje güncellenemedi",
      "Edit Project": "Projeyi Düzenle",
      "New Project": "Yeni Proje",
      "Project Title": "Proje Başlığı",
      "Please enter a project title.": "Lütfen proje başlığı girin.",
      "Project Description": "Proje Açıklaması",
      "Please select start date": "Lütfen başlangıç tarihini seçin.",
      "Please select end date": "Lütfen bitiş tarihini seçin.",
      "Task list updated!": "Görev listesi yenilendi!",
      "Project list updated!": "Proje listesi yenilendi!",
      "Project successfully created.": "Proje başarıyla oluşturuldu.",
      "An error occurred while creating the project.": "Proje oluşturulurken bir hata oluştu.",
      "There are no project to list.": "Listelenecek proje bulunmamaktadır.",
      "There are no task to list.": "Listelenecek görev bulunmamaktadır.",
      "Project status updated": "Proje durumu güncellendi",
      "Project status could not be updated": "Project durumu güncellenemedi",
      "Reopen Project": "Projeyi Geri Al",
      "Complete Project": "Projeyi Tamamla",
      "User Assignment": "Kullanıcı Atama",
      "Some tasks have already been assigned to another project.": "Bazı görevler zaten başka bir projeye atanmış.",
      "The task assignment process was completed successfully.": "Görev atama işlemi başarıyla tamamlandı.",
      "An error occurred while assigning a task.": "Görev atama işlemi sırasında bir hata oluştu.",
      "All tasks have been removed.": "Tüm görevler kaldırıldı.",
      "All Tasks": "Tüm Görevler",
      "Already assigned": "Zaten atanmış",
      "No tasks available for this project": "Bu proje için uygun görev yok",
      "Assign Task": "Görev Ata",
      "Tasks assigned to the project": "Projeye Atanmış Görevler",
      "Attached Files": "Ekli Dosyalar",
      "No attached files found.": "Ekli dosya bulunmuyor.",
      "Error occurred": "Hata oluştu",
      "Projects Analysis": "Proje Analizleri",
      "Projects and tasks detailed analysis": "Proje ve görevlerle ilgili detaylı analiz",
      "Completed Projects": "Tamamlanan Projeler",
      "Ongoing Projects": "Devam Eden Projeler",
      "Completed Tasks": "Tamamlanan Görevler",
      "Ongoing Tasks": "Devam Eden Görevler",
      "Users": "Kullanıcılar",
      "Start and end dates": "Başlangıç ve bitiş tarihleri",
      "Registered Users": "Kayıtlı kullanıcılar",
      "No tasks found based on your criteria.": "Seçtiğiniz kriterlerde görev bulunamadı.",
      "Select User(s)": "Kullanıcı seçin",
      "Select Status": "Durum seçin",
      "Incomplete": "Tamamlanmadı",
      "Complete": "Tamamlandı",
      "Select Date Range": "Tarih aralığı seç",
      "No tasks found.": "Görev bulunamadı.",
      "Project Analysis": "Proje Analizi",
      "Tasks Analysis": "Görev Analizi",
      "Filtered tasks not found.": "Seçtiğiniz filtrelere uygun görev bulunamamaktadır.",
      "Firestore info message": "Silme ve düzenleme işlemleri Firestore'da gerçekleşir. Firebase Kimlik Doğrulamasında değişiklik yapmak için firebase-admin özelliği gereklidir. Bu özellik bu projede şu an için aktif değildir.",
      "User Management": "Kullanıcı Yönetimi",
      "Admin": "Admin",
      "Manager": "Yönetici",
      "Employees": "Çalışanlar",
      "Customers": "Müşteriler",
      "Create User": "Kullanıcı Oluştur",
      "No users found": "Kullanıcı bulunmamaktadır.",
      "Project Management": "Proje Yönetimi",
      "All Projects": "Tüm Projeler",
      "No projects found": "Proje bulunmamaktadır.",
      "Task Management": "Görev Yönetimi",
      "No tasks found": "Görev bulunmamaktadır.",
      "Name": "Ad",
      "Email": "E-posta",
      "Role": "Rol",
      "Operations": "İşlemler",
      "No one assigned": "Atanan Yok",
      "Profile Information": "Profil Bilgileri",
      "Personnel": "Personel",
      "Current Password": "Mevcut Şifre",
      "New Password": "Yeni Şifre",
      "Confirm New Password": "Yeni Şifre Tekrarı",
      "Current password is wrong!": "Mevcut şifre hatalı!",
      "New passwords do not match!": "Yeni şifreler eşleşmiyor!",
      "Please enter your current password!": "Mevcut şifreyi giriniz!",
      "Please enter your new password!": "Yeni şifre giriniz!",
      "Password must be at least 6 characters long!": "Şifre en az 6 karakter olmalıdır!",
      "Please confirm your new password!": "Şifre tekrarını giriniz!",
      "Update Password": "Şifreyi Güncelle",
      "New User Registration": "Yeni Kullanıcı Kaydı",
      "Edit User": "Kullanıcıyı Düzenle",
      "Please select user type!": "Lütfen kullanıcı tipini seçin!",
      "Please enter your name!": "Adınızı girin!",
      "Email is required": "E-posta zorunludur",
      "Please enter a valid email": "Geçerli bir e-posta adresi girin",
      "Phone number is required": "Telefon numarası zorunludur",
      "Phone number must be between 10 and 15 digits": "Telefon numarası 10-15 rakam arasında olmalıdır",
      "Company Name": "Şirket Adı",
      "Please enter company name!": "Şirket adını girin!",
      "Password is required": "Şifre giriniz",
      "Password must be at least 6 characters long": "Şifre en az 6 karakter olmalıdır",
      "Password must contain at least one uppercase letter": "Şifre en az bir büyük harf içermelidir",
      "Password must contain at least one lowercase letter": "Şifre en az bir küçük harf içermelidir",
      "Password must contain at least one digit": "Şifre en az bir rakam içermelidir",
      "Save": "Kaydet",
      "User Type": "Kullanıcı Tipi",
      "NameSurname": "Ad Soyad",
      "Phone Number": "Telefon Numarası",
      "Password": "Şifre",
      "Analysis": "Analizler",
      "Pending": "Bekliyor",
      "Search": "Ara",
      "Reset": "Temizle",
      "No data found matching your search criteria.": "Aradığınız kriterlerde veri bulunamamaktadır.",
      "Project successfully deleted.": "Proje başarıyla silinmiştir.",
      "Task successfully deleted.": "Görev başarıyla silinmiştir.",
      "User successfully deleted.": "Kullanıcı başarıyla silinmiştir.",
      "Please enter a project description.": "Lütfen proje açıklaması girin.",
      "Project History": "Proje Tarihçesi",
      "No tasks have been assigned to this project.": "Bu projeye görev atanmamıştır.",
      "List": "Listele",
      "You can upload multiple files.": "Birden fazla dosya yükleyebilirsiniz.",
      "Category Level": "Kategori",
      "Upcoming Tasks": "Yaklaşan Görevler",
      "Latest Added Tasks": "Son Eklenen Görevler",
      "Latest Added Projects": "Son Eklenen Projeler",
      "confirm": {
        "deleteUserTitle": "Bu kullanıcıyı silmek istediğinize emin misiniz?",
        "deleteContent": "Bu işlem geri alınamaz.",
        "yes": "Evet",
        "no": "Hayır",
        "deleteProjectTitle": "Bu projeyi silmek istediğinize emin misiniz?",
        "deleteTaskTitle": "Bu görevi silmek istediğinize emin misiniz?",
      },
      "No customer info.": "Müşteri bilgisi yok.",
      "taskPriorities": {
        "urgent": "Acil",
        "soon": "Yakın Zamanda",
        "canWait": "Bekleyebilir"
      },
      "taskCategories": {
        "demand": "İstek",
        "error": "Hata",
        "meeting": "Görüşme"
      },
      "projectPriorities": {
        "high": "Yüksek",
        "medium": "Orta",
        "low": "Düşük"
      },
      "projectCategories": {
        "software": "Yazılım",
        "design": "Tasarım",
        "marketing": "Pazarlama",
        "finance": "Finans"
      },
      "changedBy": "{{name}} tarafından {{timestamp}}",
      "history": {
        "assign": "Kullanıcı atandı: {{users}}",
        "unassign": "Atanan kullanıcılardan çıkarıldı: {{users}}",
        "update": "Güncellenen detaylar: {{details}}",
        "taskAssign": "Görev atamaları: {{tasks}}",
        "taskupdate": "Görev güncellemeleri: {{tasks}}",
        "categoryupdate": "Kategori güncellendi: {{category}}",
        "priorityupdate": "Öncelik güncellendi: {{priority}}",
        "statusupdate": "Durum güncellendi: {{status}}",
        "unassigntaskupdate": "Atamadan çıkarılan görevler: {{tasks}}",
        "customerupdate": "Müşteri güncellendi: {{customer}}",
        "titleupdate": "Başlık güncellendi: {{title}}",
        "descriptionupdate": "Açıklama güncellendi: {{description}}",
        "firsthistory": {
          "task": "Görev başarıyla oluşturuldu.",
          "project": "Proje başarıyla oluşturuldu."
        }
      },
      "Assign": "Ata",
      "Click to sort": "Sıralamak için tıklayın",
      "Filter": "Filtrele",
      "There is no data to display.": "Görüntülenecek veri bulunmamaktadır.",
      "Select a customer first.": "Önce müşteri seçiniz.",
      "This field cannot be changed.": "Bu alan değiştirilemez.",
      "No upcoming tasks.":"Yaklaşan görev yok."


    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: localStorage.getItem('selectedLanguage') || 'tr',
    fallbackLng: 'tr',
    interpolation: { escapeValue: false }
  });

export default i18n;
