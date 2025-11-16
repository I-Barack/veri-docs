import User from "../models/user.model.js";
import Organisation from "../models/organisation.model.js";

const syncUserProfile = async (req, res) => {
  try {
    const payload = req.auth?.payload;
    if (!payload) return res.status(401).json({ message: "Unauthorized" });

    const sub = payload.sub;
    const email = payload.email;
    const name = payload.name || payload.nickname || "Unnamed";
    const roles = payload["https://veridocs.com/roles"] || ["individual"];

    let user = await User.findOne({ "authProvider.providerId": sub });

    if (!user) {
      user = await User.create({
        firstName: name,
        lastName: name,
        email: email,
        phone: payload.phone || 0,
        nationalID: payload.nationalID || "88796778",
        authProvider: {
          provider: sub.split("|")[0],
          providerID: sub,
        },
        roles,
        verified: false,
      });
    }

    res.json({
      ok: true,
      user: {
        id: user._id,
        name: user.firstName + " " + user.lastName,
        email: user.email,
        roles: user.roles,
      },
    });
  } catch (err) {
    console.error("syncUserProfile error:", err);
    res.status(500).json({ ok: false, error: err.message });
  }
};

export default syncUserProfile;
