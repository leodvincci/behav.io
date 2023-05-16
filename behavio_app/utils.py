import openai
from dotenv import load_dotenv
import os

load_dotenv()

openai.api_key = os.environ["api_key"]


def generate_feedback(gpt_input):
    # Prompt taking in the input from user's response. Feel free to tweak as you see fit, this is just the first pass.
    prompt = (
        "As an AI Interview Coach, I've been asked to provide feedback on a candidate's response using the STAR method. "
        "Here is the candidate's response:\n\n"
        "Question: {question}\n\n"
        "Situation: {situation}\n\n"
        "Task: {task}\n\n"
        "Action: {action}\n\n"
        "Result: {result}\n\n"
        "Please provide detailed feedback and suggestions for improvement, keeping in mind to address any areas where the response is incomplete or incoherent. "
        "Grade the response from A to F, where A represents a perfect response and F indicates that almost everything needs to be changed. "
        "Begin your feedback with the grade in this format: 'Grade: x'. "
        "Maintain proper grammatical formatting in your feedback, but avoid using 'new line' formatting. "
        "End your feedback with the signature -GPT Coach. Stick to this structure in your response."

    ).format(**gpt_input)

    # using GPT 3.5's 'davinci' engine for more long form text responses. max length of 300 'tokens'. We can adjust that if the reponses are being to short or get cut off or something.
    response = openai.Completion.create(
        engine="text-davinci-003", prompt=prompt, temperature=0.3, max_tokens=300
    )
    print(f"AI: ", response.choices[0])
    # We return the first generated text
    return response.choices[0].text.strip()
