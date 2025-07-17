document.addEventListener('DOMContentLoaded', function() {
  // Selecciona el formulario y los campos de entrada
  const form = document.querySelector('form[action*="formspree"]');
  const nombreInput = document.getElementById('nombre');
  const emailInput = document.getElementById('email');
  const mensajeInput = document.getElementById('mensaje');

  // Si el formulario no existe, no ejecuta el resto del script
  if (!form) {
    return;
  }

  // Valida que un campo no esté vacío
  const validarCampoRequerido = (input) => {
    return input.value.trim() !== '';
  };

  // Valida que el email tenga un formato correcto
  const validarFormatoEmail = (input) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(input.value.trim());
  };

  //FUNCIÓN PARA ACTUALIZAR LA VISTA (CSS)
  const mostrarEstadoValidacion = (input, esValido) => {
    // CORRECCIÓN: Busca el <label> padre del input
    const parentLabel = input.closest('label');
    if (!parentLabel) return;

    // Limpia las clases de validación anteriores del label
    parentLabel.classList.remove('valid', 'invalid');
    // Añade la clase correcta ('valid' o 'invalid') al label
    if (esValido) {
      parentLabel.classList.add('valid');
    } else {
      parentLabel.classList.add('invalid');
    }
  };

  //FUNCIÓN PRINCIPAL PARA VALIDACIÓN
  const validarCampo = (input) => {
    let esValido = false;

    // Determina qué validación aplicar según el campo
    if (input === nombreInput || input === mensajeInput) {
      esValido = validarCampoRequerido(input);
    } else if (input === emailInput) {
      esValido = validarCampoRequerido(input) && validarFormatoEmail(input); // Para el email, debe cumplir ambas condiciones
    }
    mostrarEstadoValidacion(input, esValido); // Muestra el resultado visualmente
    return esValido;
  };

  //EVENTOS
  // Se dispara cada vez que el usuario escribe en cualquier campo
  form.addEventListener('input', function(e) {
    // Llama a la función de validación para el campo que se está modificando
    if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') {
      validarCampo(e.target);
    }
  });
  // Validatodo el formulario antes de intentar enviarlo
  form.addEventListener('submit', function(e) {
    const esNombreValido = validarCampo(nombreInput);
    const esEmailValido = validarCampo(emailInput);
    const esMensajeValido = validarCampo(mensajeInput);
    // Si algún campo no es válido, detiene el envío
    if (!esNombreValido || !esEmailValido || !esMensajeValido) {
      e.preventDefault(); // Detiene el envío a Formspree
      alert('Por favor, completa todos los campos correctamente antes de enviar.');
    }
  });
});
