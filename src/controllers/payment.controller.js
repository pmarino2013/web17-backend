import { MercadoPagoConfig, Preference } from "mercadopago";

const createPayment = async (req, res) => {
  try {
    //mercado Pago
    const client = new MercadoPagoConfig({
      accessToken: process.env.YOUR_ACCESS_TOKEN,
    });

    const preference = new Preference(client);

    const referenciaPago = await preference.create({
      body: {
        items: [
          {
            title: req.body.title,
            quantity: req.body.cantidad,
            unit_price: req.body.precio,
          },
        ],
        back_url: {
          success: "http://localhost:9500/success",
          failure: "http://localhost:9500/failure",
          pending: "http://localhost:9500/pending",
        },
      },
    });
    // .then(console.log)
    // .catch(console.log);

    res.status(200).json({
      ok: true,
      id: referenciaPago.id,
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

export { createPayment };
