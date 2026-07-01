import { supabase } from "./supabaseClient";

export async function guardarPedidoEnSupabase(datosFormulario) {
  try {
    const { data, error } = await supabase.from("address").insert([
      {
        first_name: datosFormulario.firstName,
        last_name: datosFormulario.lastName,
        email: datosFormulario.email,
        phone: datosFormulario.phone,
        addres_line_1: datosFormulario.addressLine1,
        addres_line_2: datosFormulario.addressLine2,
        city: datosFormulario.city,
        country: datosFormulario.country,
        state: datosFormulario.state,
        postal_code: datosFormulario.postalCode,
      },
    ]);
    if (error) throw error;
    return { success: true, data };
  } catch (error) {
    console.log("Error al guardar", error.message);
    return { success: false, error: error.message };
  }
}
