import { useState } from "react"
import API from "../api"

function Dashboard() {

  // ==========================================
  // STATES
  // ==========================================

  const [file, setFile] = useState(null)

  const [message, setMessage] = useState("")

  const [question, setQuestion] = useState("")

  const [answer, setAnswer] = useState("")

  const [loading, setLoading] = useState(false)

  const [asking, setAsking] = useState(false)

  const [review, setReview] = useState("")

  const [multiReview, setMultiReview] = useState("")

  const [reviewLoading, setReviewLoading] = useState(false)

  const [multiLoading, setMultiLoading] = useState(false)


  // ==========================================
  // HANDLE FILE CHANGE
  // ==========================================

  const handleFileChange = (e) => {

    setFile(e.target.files[0])

  }


  // ==========================================
  // UPLOAD PDF
  // ==========================================

  const uploadPDF = async () => {

    if (!file) {

      alert("Please select a PDF")

      return
    }

    const formData = new FormData()

    formData.append("file", file)

    try {

      setLoading(true)

      setMessage("AI Processing PDF...")

      const response = await API.post(
        "/upload",
        formData
      )

      setMessage(response.data.message)

    }

    catch (error) {

      console.log(error)

      setMessage(
        "Processing taking longer than expected..."
      )

    }

    finally {

      setLoading(false)

    }

  }


  // ==========================================
  // ASK QUESTION
  // ==========================================

  const askQuestion = async () => {

    if (!question) {

      alert("Please enter a question")

      return
    }

    try {

      setAsking(true)

      setAnswer("AI is analyzing the paper...")

      const response = await API.get(
        `/ask?question=${question}`
      )

      setAnswer(response.data.answer)

    }

    catch (error) {

      console.log(error)

      setAnswer("Failed to get answer")

    }

    finally {

      setAsking(false)

    }

  }


  // ==========================================
  // GENERATE REVIEW
  // ==========================================

  const generateReview = async () => {

    try {

      setReviewLoading(true)

      setReview("Generating AI Review...")

      const response = await API.get("/review")

      setReview(response.data.review)

    }

    catch (error) {

      console.log(error)

      setReview("Failed to generate review")

    }

    finally {

      setReviewLoading(false)

    }

  }


  // ==========================================
  // GENERATE MULTI AGENT REVIEW
  // ==========================================

  const generateMultiReview = async () => {

    try {

      setMultiLoading(true)

      setMultiReview(
        "Generating Multi-Agent Review..."
      )

      const response = await API.get(
        "/multi-review"
      )

      setMultiReview(
        response.data.multi_agent_review
      )

    }

    catch (error) {

      console.log(error)

      setMultiReview(
        "Failed to generate multi-agent review"
      )

    }

    finally {

      setMultiLoading(false)

    }

  }


  // ==========================================
  // UI
  // ==========================================

  return (

    <div className="flex-1 p-8 bg-[#474448] min-h-screen">

      {/* TITLE */}

      <h1 className="text-4xl font-bold text-[#F1F0EA] mb-6">

        AI Research Paper Assistant

      </h1>


      {/* ==========================================
          UPLOAD SECTION
      ========================================== */}

      <div
        id="upload-section"
        className="bg-[#534B52] rounded-2xl p-6 mb-6"
      >

        <h2 className="text-2xl text-[#F1F0EA] mb-4">

          Upload Research Paper

        </h2>


        <div className="border-2 border-dashed border-[#E0DDCF] p-10 rounded-2xl text-center text-[#F1F0EA]">

          <label
            className="
              flex
              flex-col
              items-center
              justify-center
              w-full
              h-52
              border-2
              border-dashed
              border-[#F1F0EA]
              rounded-2xl
              cursor-pointer
              bg-[#2D232E]
              hover:bg-[#3A313B]
              transition
            "
          >

            <div className="text-center">

              <p className="text-2xl mb-3">
                📄
              </p>

              <p className="text-lg font-semibold">

                Click to Upload PDF

              </p>

              <p className="text-sm text-gray-300 mt-2">

                Upload your research paper here

              </p>

              {
                file && (
                  <p className="mt-4 text-green-300">

                    Selected: {file.name}

                  </p>
                )
              }

            </div>


            <input
              type="file"
              accept=".pdf"
              onChange={handleFileChange}
              className="hidden"
            />

          </label>


          <button
            onClick={uploadPDF}
            disabled={loading}
            className="
              mt-6
              bg-[#2D232E]
              px-8
              py-3
              rounded-xl
              hover:bg-[#3A313B]
              transition
            "
          >

            {
              loading
                ? "Processing..."
                : "Upload PDF"
            }

          </button>


          <p className="mt-4">

            {message}

          </p>

        </div>

      </div>


      {/* ==========================================
          AI CHAT SECTION
      ========================================== */}

      <div
        id="chat-section"
        className="bg-[#534B52] rounded-2xl p-6 mb-6"
      >

        <h2 className="text-2xl text-[#F1F0EA] mb-4">

          Ask Questions

        </h2>


        <div className="flex gap-4 mb-4">

          <input
            type="text"
            placeholder="Ask about the research paper..."
            value={question}
            onChange={(e) =>
              setQuestion(e.target.value)
            }
            className="
              flex-1
              p-4
              rounded-xl
              bg-[#2D232E]
              text-[#F1F0EA]
              outline-none
            "
          />


          <button
            onClick={askQuestion}
            disabled={asking}
            className="
              bg-[#2D232E]
              px-6
              rounded-xl
              text-[#F1F0EA]
              hover:bg-[#3A313B]
            "
          >

            {
              asking
                ? "Thinking..."
                : "Ask"
            }

          </button>

        </div>


        <div
          className="
            bg-[#2D232E]
            p-6
            rounded-2xl
            min-h-[120px]
            whitespace-pre-wrap
            text-[#F1F0EA]
          "
        >

          {
            answer
              ? answer
              : "AI response will appear here..."
          }

        </div>

      </div>


      {/* ==========================================
          REVIEW SECTIONS
      ========================================== */}

      <div
        id="review-section"
        className="grid grid-cols-2 gap-6"
      >

        {/* AI REVIEW */}

        <div className="bg-[#2D232E] p-6 rounded-2xl text-[#F1F0EA]">

          <div className="flex justify-between items-center mb-4">

            <h3 className="text-2xl font-semibold">

              AI Review

            </h3>


            <button
              onClick={generateReview}
              disabled={reviewLoading}
              className="
                bg-[#534B52]
                px-4
                py-2
                rounded-xl
                hover:bg-[#6B5E68]
              "
            >

              {
                reviewLoading
                  ? "Generating..."
                  : "Generate"
              }

            </button>

          </div>


          <div className="whitespace-pre-wrap text-sm leading-7">

            {
              review
                ? review
                : "AI review will appear here..."
            }

          </div>

        </div>


        {/* MULTI AGENT REVIEW */}

        <div className="bg-[#2D232E] p-6 rounded-2xl text-[#F1F0EA]">

          <div className="flex justify-between items-center mb-4">

            <h3 className="text-2xl font-semibold">

              Multi-Agent Review

            </h3>


            <button
              onClick={generateMultiReview}
              disabled={multiLoading}
              className="
                bg-[#534B52]
                px-4
                py-2
                rounded-xl
                hover:bg-[#6B5E68]
              "
            >

              {
                multiLoading
                  ? "Generating..."
                  : "Generate"
              }

            </button>

          </div>


          <div className="whitespace-pre-wrap text-sm leading-7">

            {
              multiReview
                ? multiReview
                : "Multi-agent review will appear here..."
            }

          </div>

        </div>

      </div>

    </div>

  )

}

export default Dashboard