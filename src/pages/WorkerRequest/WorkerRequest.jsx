import { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { useTranslation } from "react-i18next";
import emailjs from "@emailjs/browser";

import {
  FaUser,
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
  FaUsers,
  FaCalendarAlt,
  FaBuilding,
  FaBolt,
  FaClipboardList,
  FaShieldAlt,
  FaCheckCircle,
  FaHeadset,
  FaUserCheck,
  FaArrowRight,
} from "react-icons/fa";
import {} from "react-icons/fa";

export default function WorkerRequest() {
  const { t, i18n } = useTranslation();

  const [success, setSuccess] = useState(false);
  const [errors, setErrors] = useState({});

  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    location: "",
    workerCategory: "",
    workersCount: "",
    startDate: "",
    duration: "",
    projectType: "",
    urgency: "",
    workDescription: "",
  });

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });

    AOS.init({
      duration: 1000,
      once: true,
      easing: "ease-out-cubic",
    });
  }, []);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });

    setErrors({
      ...errors,
      [e.target.name]: "",
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = {};

    if (!form.name.trim()) {
      newErrors.name = "Please enter your full name";
    } else if (form.name.trim().length < 3) {
      newErrors.name = "Name must be at least 3 characters";
    } else if (!/^[A-Za-z\s]+$/.test(form.name)) {
      newErrors.name = "Only letters are allowed";
    }

    if (!form.phone.trim()) {
      newErrors.phone = "Please enter mobile number";
    } else if (!/^[6-9]\d{9}$/.test(form.phone)) {
      newErrors.phone = "Enter a valid 10-digit mobile number";
    }

    if (!form.email.trim()) {
      newErrors.email = "Please enter email address";
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(form.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!form.location.trim()) newErrors.location = "Please enter location";

    if (!form.workerCategory)
      newErrors.workerCategory = "Select worker category";

    if (!form.workersCount) newErrors.workersCount = "Select workers count";

    if (!form.startDate) newErrors.startDate = "Select start date";

    if (!form.duration) newErrors.duration = "Select duration";

    if (!form.projectType) newErrors.projectType = "Select project type";

    if (!form.urgency) newErrors.urgency = "Select urgency";

    if (!form.workDescription.trim()) {
      newErrors.workDescription = "Please enter work description";
    } else if (form.workDescription.trim().length < 10) {
      newErrors.workDescription =
        "Description should be at least 10 characters";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      setSuccess(true);
      await emailjs.send(
        "service_1852j2k",
        "template_l1gbul9",
        {
          name: form.name,
          phone: form.phone,
          email: form.email,
          location: form.location,
          workerCategory: form.workerCategory,
          workersCount: form.workersCount,
          startDate: form.startDate,
          duration: form.duration,
          projectType: form.projectType,
          urgency: form.urgency,
          workDescription: form.workDescription,
        },
        "W3X0wptwQu_1yv-nf",
      );

      

      setForm({
        name: "",
        phone: "",
        email: "",
        location: "",
        workerCategory: "",
        workersCount: "",
        startDate: "",
        duration: "",
        projectType: "",
        urgency: "",
        workDescription: "",
      });

      setTimeout(() => {
        setSuccess(false);
      }, 5000);
    } catch (err) {
      console.error(err);
      alert("Failed to send request");
    }
  };

  return (
    <>
      {success && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/40 backdrop-blur-sm px-4">
          <div
            className="
        bg-white
        w-full
        max-w-md
        rounded-3xl
        p-8
        text-center
        shadow-[0_25px_60px_rgba(0,0,0,0.15)]
        animate-[popup_0.35s_ease]
      "
          >
            <div className="w-20 h-20 mx-auto rounded-full bg-green-100 flex items-center justify-center mb-5">
              <FaCheckCircle className="text-green-600 text-4xl" />
            </div>

            <h3 className="text-2xl font-bold text-[#111827] mb-3">
              {t("workerPopupTitle")}
            </h3>

            <p className="text-gray-600 leading-relaxed">
              {t("workerPopupDesc")}
            </p>

            <button
              onClick={() => setSuccess(false)}
              className="
          mt-6
          w-full
          py-3
          rounded-xl
          font-semibold
          text-white
          bg-[oklch(0.47_0.17_28.33)]
          hover:opacity-90
          transition
          cursor-pointer
        "
            >
              {t("workerPopupButton")}
            </button>
          </div>
        </div>
      )}

      <section className="py-14 bg-gray-50 min-h-screen pt-[calc(var(--nav-height)+20px)] sm:pt-[calc(var(--nav-height)+45px)]">
        <div className="max-w-[1320px] mx-auto px-6">
          <div className="text-center mb-10 md:mb-10 px-2">
            <p
              className="
      text-[oklch(0.47_0.17_28.33)]
      tracking-[4px]
      md:tracking-[6px]
      text-[10px]
      md:text-xs
      font-semibold
      uppercase
      mb-4
    "
            >
              {t("workerBadge")}
            </p>

            <h1
              className="
      text-3xl
      sm:text-4xl
      md:text-5xl
      font-bold
      text-[#0B1C2C]
      leading-tight
      mb-5
    "
            >
              {t("workerTitle")}
            </h1>

            <p
              className="
      text-gray-600
      max-w-3xl
      mx-auto
      text-sm
      md:text-base
      leading-relaxed
    "
            >
              {t("workerDesc")}
            </p>
          </div>

          <div className="bg-white rounded-[32px] border border-[#ece7dd] shadow-[0_15px_60px_rgba(0,0,0,0.08)] p-6 md:p-12">
            <form onSubmit={handleSubmit} className="space-y-10">
              <div className="flex items-center gap-4 mb-6">
                <div
                  className="
      w-13 h-13
      rounded-2xl
      border
      border-[oklch(0.47_0.17_28.33)]
      bg-[oklch(0.47_0.17_28.33/0.08)]
      flex
      items-center
      justify-center
      shadow-sm
    "
                >
                  <FaUser className="text-[oklch(0.47_0.17_28.33)] text-xl" />
                </div>

                <h3 className="text-[18px] md:text-[24px] font-bold text-[#111827] tracking-tight">
                  {t("workerYourDetailsTitle")}
                </h3>
              </div>

              <hr className="mb-8" />

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <input
                    name="name"
                    value={form.name}
                    onChange={(e) => {
                      const value = e.target.value.replace(/[^A-Za-z\s]/g, "");

                      setForm({
                        ...form,
                        name: value,
                      });

                      setErrors({
                        ...errors,
                        name: "",
                      });
                    }}
                    placeholder={t("workerFullNamePlaceholder")}
                    className="premiumInput"
                  />

                  {errors.name && (
                    <p className="text-red-500 text-sm mt-2">{errors.name}</p>
                  )}
                </div>

                <div>
                  <input
                    name="phone"
                    value={form.phone}
                    onChange={(e) => {
                      const value = e.target.value
                        .replace(/\D/g, "")
                        .slice(0, 10);
                      setForm({ ...form, phone: value });
                    }}
                    placeholder={t("workerPhonePlaceholder")}
                    className="premiumInput"
                  />
                  {errors.phone && (
                    <p className="text-red-500 text-sm mt-2">{errors.phone}</p>
                  )}
                </div>

                <div>
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder={t("workerEmailPlaceholder")}
                    className="premiumInput"
                  />

                  {errors.email && (
                    <p className="text-red-500 text-sm mt-2">{errors.email}</p>
                  )}
                </div>

                <div>
                  <input
                    name="location"
                    value={form.location}
                    onChange={handleChange}
                    placeholder={t("workerLocationPlaceholder")}
                    className="premiumInput"
                  />
                  {errors.location && (
                    <p className="text-red-500 text-sm mt-2">
                      {errors.location}
                    </p>
                  )}
                </div>
              </div>

              {/* SECTION 2 */}

              <div className="mt-12">
                <div className="flex items-center gap-4 mb-6">
                  <div
                    className="
      w-13 h-13
      rounded-2xl
      border
      border-[oklch(0.47_0.17_28.33)]
      bg-[oklch(0.47_0.17_28.33/0.08)]
      flex
      items-center
      justify-center
      shadow-sm
    "
                  >
                    <FaUsers className="text-[oklch(0.47_0.17_28.33)] text-xl" />
                  </div>

                  <h3 className="text-[18px] md:text-[24px] font-bold text-[#111827] tracking-tight">
                    {t("workerRequirementTitle")}
                  </h3>
                </div>

                <hr className="mb-8" />

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <select
                      name="workerCategory"
                      value={form.workerCategory}
                      onChange={handleChange}
                      className="premiumInput"
                    >
                      <option value="">{t("workerCategoryPlaceholder")}</option>

                      <option>{t("workerCategory1")}</option>
                      <option>{t("workerCategory2")}</option>
                      <option>{t("workerCategory3")}</option>
                      <option>{t("workerCategory4")}</option>
                      <option>{t("workerCategory5")}</option>
                      <option>{t("workerCategory6")}</option>
                      <option>{t("workerCategory7")}</option>
                      <option>{t("workerCategory8")}</option>
                      <option>{t("workerCategory9")}</option>
                      <option>{t("workerCategory10")}</option>
                      <option>{t("workerCategory11")}</option>
                      <option>{t("workerCategory12")}</option>
                      <option>{t("workerCategory13")}</option>
                    </select>

                    {errors.workerCategory && (
                      <p className="text-red-500 text-sm mt-2">
                        {errors.workerCategory}
                      </p>
                    )}
                  </div>

                  <div>
                    <select
                      name="workersCount"
                      value={form.workersCount}
                      onChange={handleChange}
                      className="premiumInput"
                    >
                      <option value="">
                        {t("workersRequiredPlaceholder")}
                      </option>

                      <option>1</option>
                      <option>2</option>
                      <option>3</option>
                      <option>5</option>
                      <option>10</option>
                      <option>15</option>
                      <option>20</option>
                      <option>25</option>
                      <option>50+</option>
                    </select>

                    {errors.workersCount && (
                      <p className="text-red-500 text-sm mt-2">
                        {errors.workersCount}
                      </p>
                    )}
                  </div>

                  <div>
                    <input
                      type="date"
                      name="startDate"
                      value={form.startDate}
                      onChange={handleChange}
                      className="premiumInput"
                    />

                    {errors.startDate && (
                      <p className="text-red-500 text-sm mt-2">
                        {errors.startDate}
                      </p>
                    )}
                  </div>

                  <div>
                    <select
                      name="duration"
                      value={form.duration}
                      onChange={handleChange}
                      className="premiumInput"
                    >
                      <option value="">{t("durationPlaceholder")}</option>

                      <option>{t("duration1")}</option>
                      <option>{t("duration2")}</option>
                      <option>{t("duration3")}</option>
                      <option>{t("duration4")}</option>
                      <option>{t("duration5")}</option>
                      <option>{t("duration6")}</option>
                      <option>{t("duration7")}</option>
                    </select>

                    {errors.duration && (
                      <p className="text-red-500 text-sm mt-2">
                        {errors.duration}
                      </p>
                    )}
                  </div>
                </div>

                {/* SECTION 3 */}

                <div className="mt-12">
                  <div className="flex items-center gap-4 mb-6">
                    <div
                      className="
      w-13 h-13
      rounded-2xl
      border
      border-[oklch(0.47_0.17_28.33)]
      bg-[oklch(0.47_0.17_28.33/0.08)]
      flex
      items-center
      justify-center
      shadow-sm
    "
                    >
                      <FaBuilding className="text-[oklch(0.47_0.17_28.33)] text-xl" />
                    </div>

                    <h3 className="text-[14px] md:text-[24px] font-bold text-[#111827] tracking-tight">
                      {t("projectInfoTitle")}
                    </h3>
                  </div>

                  <hr className="mb-8" />

                  <div className="grid md:grid-cols-2 gap-6 items-start">
                    <div className="flex flex-col">
                      <select
                        name="projectType"
                        value={form.projectType}
                        onChange={handleChange}
                        className="premiumInput"
                      >
                        <option value="">{t("projectTypePlaceholder")}</option>

                        <option>{t("projectType1")}</option>
                        <option>{t("projectType2")}</option>
                        <option>{t("projectType3")}</option>
                        <option>{t("projectType4")}</option>
                        <option>{t("projectType5")}</option>
                        <option>{t("projectType6")}</option>
                        <option>{t("projectType7")}</option>
                        <option>{t("projectType8")}</option>
                        <option>{t("projectType9")}</option>
                        <option>{t("projectType10")}</option>
                      </select>

                      {errors.projectType && (
                        <p className="text-red-500 text-sm mt-2">
                          {errors.projectType}
                        </p>
                      )}
                    </div>

                    <div className="flex flex-col">
                      <select
                        name="urgency"
                        value={form.urgency}
                        onChange={handleChange}
                        className="premiumInput"
                      >
                        <option value="">{t("urgencyPlaceholder")}</option>

                        <option>{t("urgency1")}</option>
                        <option>{t("urgency2")}</option>
                        <option>{t("urgency3")}</option>
                        <option>{t("urgency4")}</option>
                      </select>

                      {errors.urgency && (
                        <p className="text-red-500 text-sm mt-2">
                          {errors.urgency}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="mt-7">
                    <textarea
                      rows="6"
                      name="workDescription"
                      value={form.workDescription}
                      onChange={handleChange}
                      placeholder={t("workDescriptionPlaceholder")}
                      className="premiumInput resize-none"
                    />

                    {errors.workDescription && (
                      <p className="text-red-500 text-sm mt-2">
                        {errors.workDescription}
                      </p>
                    )}
                  </div>
                </div>
              </div>
              <div className="relative overflow-hidden bg-white border border-[oklch(0.47_0.17_28.33/0.15)] rounded-3xl p-5 sm:p-6 md:p-8 shadow-[0_15px_50px_rgba(0,0,0,0.06)]">
                <div className="absolute -top-10 -right-10 w-32 h-32 bg-[oklch(0.47_0.17_28.33/0.08)] rounded-full blur-3xl"></div>

                <div className="relative z-10 flex flex-col sm:flex-row items-start gap-4 sm:gap-5">
                  <div
                    className="
        w-14 h-14
        shrink-0
        rounded-2xl
        bg-[oklch(0.47_0.17_28.33)]
        text-white
        flex
        items-center
        justify-center
        shadow-[0_10px_25px_rgba(140,50,50,0.25)]
      "
                  >
                    <FaShieldAlt className="text-xl" />
                  </div>

                  <div className="flex-1 min-w-0">
                    <h4 className="font-bold text-base sm:text-lg text-[#111827] mb-2 leading-snug">
                      {t("workerSecurityTitle")}
                    </h4>

                    <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                      {t("workerSecurityDesc")}
                    </p>

                    <div className="flex flex-wrap gap-2 sm:gap-3 mt-5">
                      <div className="flex items-center gap-2 bg-white px-3 py-2 rounded-full border border-[oklch(0.47_0.17_28.33/0.12)]">
                        <FaCheckCircle className="text-[oklch(0.47_0.17_28.33)] shrink-0" />
                        <span className="text-[11px] sm:text-xs font-medium text-gray-700">
                          {t("workerSecurityTag1")}
                        </span>
                      </div>

                      <div className="flex items-center gap-2 bg-white px-3 py-2 rounded-full border border-[oklch(0.47_0.17_28.33/0.12)]">
                        <FaHeadset className="text-[oklch(0.47_0.17_28.33)] shrink-0" />
                        <span className="text-[11px] sm:text-xs font-medium text-gray-700">
                          {t("workerSecurityTag2")}
                        </span>
                      </div>

                      <div className="flex items-center gap-2 bg-white px-3 py-2 rounded-full border border-[oklch(0.47_0.17_28.33/0.12)]">
                        <FaUserCheck className="text-[oklch(0.47_0.17_28.33)] shrink-0" />
                        <span className="text-[11px] sm:text-xs font-medium text-gray-700">
                          {t("workerSecurityTag3")}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <button
                type="submit"
                className="
    cursor-pointer
    group
    relative
    overflow-hidden
    w-full
    flex
    items-center
    justify-center
    gap-3
    bg-gradient-to-r
    from-[oklch(0.47_0.17_28.33)]
    to-[oklch(0.42_0.15_28.33)]
    text-white
    py-4
    px-6
    rounded-2xl
    font-bold
    text-base
    sm:text-lg
    shadow-[0_15px_35px_rgba(140,50,50,0.30)]
    hover:shadow-[0_20px_45px_rgba(140,50,50,0.40)]
    hover:-translate-y-1
    active:translate-y-0
    transition-all
    duration-300
  "
              >
                <span
                  className="
      absolute
      inset-0
      bg-white/10
      translate-x-[-100%]
      group-hover:translate-x-[100%]
      transition-transform
      duration-700
      skew-x-12
    "
                />

                <span className="relative z-10 text-center break-words">
                  {t("workerSubmitButton")}
                </span>

                <FaArrowRight
                  className="
      relative
      z-10
      shrink-0
      transition-transform
      duration-300
      group-hover:translate-x-1
    "
                />
              </button>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}
