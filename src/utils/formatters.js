
// formateo de los datos para mostrar en la UI

export const formatDate = (date, includeTime = false) => {
  if (!date) return '-';
  
  try {
    const dateObj = typeof date === 'string' ? new Date(date) : date;
    
    // verificar si la fecha es valida

    if (isNaN(dateObj.getTime())) {
      console.warn('Fecha inválida:', date);
      return '-';
    }
    
    const options = {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    };
    
    if (includeTime) {
      options.hour = '2-digit';
      options.minute = '2-digit';
    }
    
    return new Intl.DateTimeFormat('es-SV', options).format(dateObj);
  } catch (error) {
    console.error('Error al formatear fecha:', date, error);
    return '-';
  }
};


  // formatear monto en dolares

export const formatCurrency = (amount) => {
  if (amount === null || amount === undefined) return '$0.00';
  
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2
  }).format(amount);
};

// formatear numero con separadores de miles

export const formatNumber = (num) => {
  if (num === null || num === undefined) return '0';
  return new Intl.NumberFormat('en-US').format(num);
};

// obtener iniciales de un nombre

export const getInitials = (name) => {
  if (!name) return '';
  const parts = name.trim().split(' ');
  if (parts.length === 1) return parts[0].substring(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
};

// validar formato dui

export const isValidDUI = (dui) => {
  const duiRegex = /^\d{8}-\d$/;
  return duiRegex.test(dui);
};

//formato telefono el salvador

export const isValidPhone = (phone) => {
  const phoneRegex = /^\d{4}-\d{4}$/;
  return phoneRegex.test(phone);
};

// formato de dui

export const formatDUI = (dui) => {
  if (!dui) return '';
  const cleaned = dui.replace(/\D/g, '');
  if (cleaned.length === 9) {
    return `${cleaned.substring(0, 8)}-${cleaned.substring(8)}`;
  }
  return dui;
};

// formatear telefono el salvador

export const formatPhone = (phone) => {
  if (!phone) return '';
  const cleaned = phone.replace(/\D/g, '');
  if (cleaned.length === 8) {
    return `${cleaned.substring(0, 4)}-${cleaned.substring(4)}`;
  }
  return phone;
};