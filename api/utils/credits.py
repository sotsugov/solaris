import re
from decimal import Decimal, ROUND_HALF_UP


def calculate_credits(text: str) -> dict:
    # Not sure how product got this in, but oh well...
    # The overall calculation is sequential, every rule adds on top of
    # base credit. The total here will not be less than 1.
    # Keep track of individual cost components using Decimals, this will help
    # avoid weird floating-point results like 0.6000000000000001
    base_cost = Decimal("1")
    char_count_cost = Decimal("0")
    word_length_cost = Decimal("0")
    third_vowel_cost = Decimal("0")
    length_penalty = Decimal("0")
    unique_word_bonus = Decimal("0")
    palindrome_multiplier = Decimal("1")

    # Add a check if a message is empty, simply return base cost as 1
    if text == "":
        credits_used = base_cost
        return {
            "credits_used": float(credits_used),
            "base_cost": float(base_cost),
            "char_count_cost": float(char_count_cost),
            "word_length_cost": float(word_length_cost),
            "third_vowel_cost": float(third_vowel_cost),
            "length_penalty": float(length_penalty),
            "unique_word_bonus": float(unique_word_bonus),
            "palindrome_multiplier": float(palindrome_multiplier),
        }

    # Character Count: Add 0.05 credits for each character in the message
    num_chars = len(text)
    char_count_cost = Decimal("0.05") * Decimal(num_chars)

    # Word length multipliers
    # For words of 1-3 characters: add 0.1 credits per word
    # For words of 4-7 characters: add 0.2 credits per word
    # For words of 8+ characters: add 0.3 credits per word
    # Let's assume we only consider English language.
    words = re.findall(r"[a-zA-Z'-]+", text)
    for word in words:
        length = len(word)
        if 1 <= length <= 3:
            word_length_cost += Decimal("0.1")
        elif 4 <= length <= 7:
            word_length_cost += Decimal("0.2")
        elif length >= 8:
            word_length_cost += Decimal("0.3")

    # Third Vowels: Apply to the entire message
    # If any third (i.e. 3rd, 6th, 9th) character is an uppercase
    # or lowercase vowel (a, e, i, o, u) add 0.3 credits for each occurrence
    for i, char in enumerate(text, start=1):
        if i % 3 == 0 and char.lower() in "aeiou":
            third_vowel_cost += Decimal("0.3")

    # Length penalty
    # If the message length exceeds 100 characters, add a penalty of 5 credits
    if num_chars > 100:
        length_penalty = Decimal("5")

    # Unique word bonus
    # If all words in the message are unique (case-sensitive), subtract 2 credits
    # from the total cost (remember the minimum cost should still be 1 credit)
    # This will grant a bonus if the message consists of a single word
    if len(set(words)) == len(words) and words:
        unique_word_bonus = Decimal("-2")

    # Calculate total credits before palindrome check
    credits = (
        base_cost
        + char_count_cost
        + word_length_cost
        + third_vowel_cost
        + length_penalty
        + unique_word_bonus
    )

    # Ensure minimum cost before palindrome multiplier
    credits = max(credits, Decimal("1"))

    # Palindrome check
    # This is at the end: double the total cost after all other rules have been applied
    # Palindromes: If the entire message is a palindrome (that is to say, after converting
    # all uppercase letters into lowercase letters and removing all
    # non-alphanumeric characters, it reads the same forward and backward),
    # double the total cost after all other rules have been applied.
    processed_message = re.sub(r"[^a-zA-Z0-9]", "", text.lower())
    if processed_message == processed_message[::-1] and processed_message != "":
        palindrome_multiplier = Decimal("2")
        credits *= palindrome_multiplier

    credits_used = credits

    # Round the costs to 2 decimal places
    rounding_precision = Decimal(".01")
    credits_used = credits_used.quantize(rounding_precision, rounding=ROUND_HALF_UP)
    char_count_cost = char_count_cost.quantize(
        rounding_precision, rounding=ROUND_HALF_UP
    )
    word_length_cost = word_length_cost.quantize(
        rounding_precision, rounding=ROUND_HALF_UP
    )
    third_vowel_cost = third_vowel_cost.quantize(
        rounding_precision, rounding=ROUND_HALF_UP
    )
    length_penalty = length_penalty.quantize(rounding_precision, rounding=ROUND_HALF_UP)
    unique_word_bonus = unique_word_bonus.quantize(
        rounding_precision, rounding=ROUND_HALF_UP
    )

    # Return a dictionary with all the costs
    return {
        "credits_used": float(credits_used),
        "base_cost": float(base_cost),
        "char_count_cost": float(char_count_cost),
        "word_length_cost": float(word_length_cost),
        "third_vowel_cost": float(third_vowel_cost),
        "length_penalty": float(length_penalty),
        "unique_word_bonus": float(unique_word_bonus),
        "palindrome_multiplier": float(palindrome_multiplier),
    }
