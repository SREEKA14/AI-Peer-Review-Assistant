function Sidebar() {

  // ==========================================
  // SMOOTH SCROLL FUNCTION
  // ==========================================

  const scrollToSection = (sectionId) => {

    const section = document.getElementById(sectionId)

    if (section) {

      section.scrollIntoView({
        behavior: "smooth"
      })

    }

  }

  return (

    <div
      className="
        w-[260px]
        min-h-screen
        bg-[#2D232E]
        text-[#F1F0EA]
        p-6
        sticky
        top-0
        shadow-2xl
      "
    >

      {/* ==========================================
          LOGO SECTION
      ========================================== */}

      <div className="mb-12">

        <div className="flex items-center gap-4">

          {/* LOGO */}

          <div
            className="
              w-12
              h-12
              rounded-2xl
              bg-[#534B52]
              flex
              items-center
              justify-center
              text-2xl
              shadow-lg
            "
          >

            🤖

          </div>


          {/* TITLE */}

          <div>

            <h1 className="text-2xl font-bold leading-none">

              PeerReview

            </h1>

            <p className="text-sm text-gray-300 mt-1">

              AI Assistant

            </p>

          </div>

        </div>

      </div>


      {/* ==========================================
          NAVIGATION BUTTONS
      ========================================== */}

      <div className="flex flex-col gap-5">

        {/* UPLOAD */}

        <button
          onClick={() =>
            scrollToSection("upload-section")
          }
          className="
            bg-[#534B52]
            p-4
            rounded-2xl
            hover:bg-[#6B5E68]
            transition
            duration-300
            text-lg
            shadow-md
          "
        >

          Upload Paper

        </button>


        {/* QUESTIONS */}

        <button
          onClick={() =>
            scrollToSection("chat-section")
          }
          className="
            bg-[#534B52]
            p-4
            rounded-2xl
            hover:bg-[#6B5E68]
            transition
            duration-300
            text-lg
            shadow-md
          "
        >

          Ask Questions

        </button>


        {/* AI REVIEW */}

        <button
          onClick={() =>
            scrollToSection("review-section")
          }
          className="
            bg-[#534B52]
            p-4
            rounded-2xl
            hover:bg-[#6B5E68]
            transition
            duration-300
            text-lg
            shadow-md
          "
        >

          AI Review

        </button>


        {/* MULTI AGENT */}

        <button
          onClick={() =>
            scrollToSection("review-section")
          }
          className="
            bg-[#534B52]
            p-4
            rounded-2xl
            hover:bg-[#6B5E68]
            transition
            duration-300
            text-lg
            shadow-md
          "
        >

          Multi-Agent Review

        </button>

      </div>

    </div>

  )

}

export default Sidebar